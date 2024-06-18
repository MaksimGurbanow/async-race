import BaseComponent from "@/components/BaseComponent";
import { CarInfo } from "@/customTypes/types";
import classes from './Modal.module.scss'
import Button from "../button/Button";

export default class Modal extends BaseComponent<HTMLDivElement> {
  private closeButton: Button;

  private time: number = Infinity;

  constructor() {
    super({
      txt: '',
      tag: 'div',
      classes: [classes.modal],
    });
    this.closeButton = new Button({
      tag: 'button',
      txt: 'X',
      events: [
        {
          eventType: 'click',
          callback: () => {
            this.toggleClass(classes.active);
          },
        }
      ],
      classes: [classes.button],
    });
    this.appendChildren(this.closeButton);
  }

  public open(props: {
    carInfo: CarInfo,
    time: number,
  }) {
    const { carInfo, time } = props;
    if (this.time > time) { 
      this.time = time;
      this.setTextContent(`The winner is ${carInfo.name}. Finished in ${time / 1000}s.`);
      this.appendChildren(this.closeButton);
      this.addClasses([classes.active]);
    }
  }
}
