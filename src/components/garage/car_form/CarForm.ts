import BaseComponent from '@/components/BaseComponent';
import Form from '@/components/custom_components/Form';
import Controllers from '@/components/custom_components/Controllers';
import { HandleDataCallback } from '@/customTypes/types';
import Button from '@/components/custom_components/button/Button';
import classes from './CarForm.module.scss';
import generateRandomCar from '@/utils/generateCar';

export default class CarForm extends BaseComponent<HTMLDivElement> {
  private createForm: Form;

  private updateForm: Form;

  private controllers: Controllers;

  constructor(
    createCar: HandleDataCallback, 
    updateCar: HandleDataCallback,
    animateCars: () => void,
    reset: () => void,
    ) {
    super({
      tag: 'div',
      classes: [classes.car_form_container],
    });

    this.createForm = new Form({
      txt: 'create',
      classes: [classes.create, classes.car_form],
      buttonCallback: createCar,
    });

    this.updateForm = new Form({
      txt: 'update',
      classes: [classes.update, classes.car_form],
      buttonCallback: updateCar,
    });

    this.controllers = new Controllers(
      { classes: [classes.controllers] },
      new Button({ 
        txt: 'Race',
        events: [
          {
            eventType: 'click',
            callback: (e) => {
              const { target } = e;
              if (target instanceof HTMLElement && !target.classList.contains(classes.disabled)) { 
                animateCars();
                target.classList.add(classes.disabled);
                this.controllers.getChildren()[1].classList.remove(classes.disabled);
              }
            },
          }
        ]
      }),
      new Button({ 
        txt: 'Reset',
        events: [
          {
            eventType: 'click',
            callback: (e) => {
              const { target } = e;
              if (target instanceof HTMLElement && !target.classList.contains(classes.disabled)) { 
                reset();
                target.classList.add(classes.disabled);
                this.controllers.getChildren()[0].classList.remove(classes.disabled);
              }
            },
          }
        ]
      }),
      new Button({ 
        txt: 'Generate Car',
        events: [
          {
            eventType: 'click',
            callback: (e) => {
              for (let i = 0; i < 100; i++) {
                createCar(generateRandomCar());
              }
            }
          }
        ] 
      }),
    );
    this.appendChildren(this.createForm, this.updateForm, this.controllers);
  }
}
