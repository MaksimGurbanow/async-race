import BaseComponent from '@/components/BaseComponent';
import { Props } from '@/customTypes/types';
import classes from './Cell.module.scss';

export default class Cell extends BaseComponent<HTMLDivElement> {
  constructor(props: Props) {
    super({
      ...props,
      tag: 'div',
      classes: [classes.cell],
    });
  }
}
