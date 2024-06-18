import BaseComponent from '@/components/BaseComponent';
import Controllers from '@/components/custom_components/Controllers';
import Header from '@/components/custom_components/Header';
import Button from '@/components/custom_components/button/Button';
import classes from './CarHeading.module.scss';
import { CallbackType } from '@/customTypes/types';

export default class CarHeading extends BaseComponent<HTMLDivElement> {
  private controllers: Controllers;

  private header: Header;

  constructor(props: { name: string, callback: () => void }) {
    const { name, callback } = props;
    super({
      tag: 'div',
      classes: [classes.car_heading],
    });
    this.controllers = new Controllers({
      classes: [classes.heading_controllers],
    });
    this.controllers.appendChildren(
      new Button({ txt: 'select' }),
      new Button({ 
        txt: 'remove',
        events: [
          {
            eventType: 'click',
            callback,
          }
        ]
      }),
    );
    this.header = new Header({ tag: 'h6', txt: name });
    this.appendChildren(this.controllers, this.header);
  }
}
