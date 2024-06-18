import BaseComponent from '@/components/BaseComponent';
import CarIcon from './car_icon/CarIcon';
import Controllers from '@/components/custom_components/Controllers';
import Button from '@/components/custom_components/button/Button';
import classes from './CarContent.module.scss';
import CarWay from './car_path/CarWay';
import startEngine from '@/utils/startEngine';
import { animation } from '@/utils/createAnimation';
import turnDriveMode from '@/utils/turnDriveMode';
import GarageView from '@/components/garage/GarageView';

export default class CarContent extends BaseComponent<HTMLDivElement> {
  private carIcon: CarIcon;

  private controllers: Controllers;

  private carWay: CarWay;

  private id: string

  private name: string;

  constructor(props: { color: string, id: string, name: string }) {
    const { color, id, name } = props;
    super({
      tag: 'div',
      classes: [classes.car_content],
    });
    this.id = id;
    this.name = name;
    this.carIcon = new CarIcon({ color });
    this.controllers = new Controllers({ classes: [classes.controllers] });
    this.controllers.appendChildren(
      new Button({ 
        txt: 'A', 
        classes: [classes.control_button], 
        events: [
          {
            eventType: 'click',
            callback: async (e) => {
              const { target } = e
              if (target instanceof HTMLElement && !target.classList.contains(classes.disabled)) {
                this.animate.bind(this)();
              }
            },
          }
        ]
      }),
      new Button({ 
        txt: 'B', 
        classes: [classes.control_button, classes.disabled],
        events: [
          {
            eventType: 'click',
            callback: (e) => {
              const { target } = e
              if (target instanceof HTMLElement && !target.classList.contains(classes.disabled)) {
                this.stop.bind(this)();
              }
            },
          }
        ]
      }),
    );
    this.carWay = new CarWay();
    this.appendChildren(this.controllers, this.carIcon, this.carWay);
  }

  public update(color: string) {
    this.carIcon.update(color);
  }

  public async animate() {
    const response = await startEngine('engine', this.id, 'started')
    const time = Math.round(response.distance / response.velocity);
    const elem = this.carIcon.getElement();
    const drivePromise = turnDriveMode('engine', this.id, 'drive');
    if (elem instanceof HTMLElement) {
      const animationResponse = elem.animate(
        animation, {
        duration: time,
        iterations: 1,
        fill: 'forwards',
      });
      if (this.controllers.getChildren().length > 0) {
        this.controllers.getChildren()[0].classList.add(classes.disabled);
        this.controllers.getChildren()[1].classList.remove(classes.disabled);
      }
      const driveResponse = await drivePromise;
      if (driveResponse === 500) {
        animationResponse.pause();
      }
      else if (driveResponse === 200) {
        GarageView.openModal({
          carInfo: {
            name: this.name,
          },
          time,
        });
        return {
          id: this.id,
          time,
          name: this.name,
        }
      }
    }
  }

  public stop() {
    const icon = this.carIcon.getElement() as HTMLElement;
    if (icon.getAnimations()[0]) {
      icon.getAnimations()[0].cancel()
    }
    if (this.controllers.getChildren().length > 0) {
      this.controllers.getChildren()[1].classList.add(classes.disabled);
      this.controllers.getChildren()[0].classList.remove(classes.disabled);
    }
  }
}
