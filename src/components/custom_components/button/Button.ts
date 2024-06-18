import { Props } from '@/customTypes/types';
import BaseComponent from '@/components/BaseComponent';
import classes from './Button.module.scss';

export default class Button extends BaseComponent<HTMLButtonElement> {
  constructor(props: Props) {
    super({
      txt: props.txt,
      tag: 'button',
      classes: [classes.button],
    });
    if (props.classes && props.classes.length > 0) {
      this.addClasses(props.classes);
    }
    if (props.events) {
      this.setCallback(props.events);
    }
  }
}
