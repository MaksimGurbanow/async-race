import BaseComponent from '@/components/BaseComponent';
import finishFlag from '@/assets/finish-flag.svg';
import classes from './CarWay.module.scss';

export default class CarWay extends BaseComponent<HTMLDivElement> {
  constructor() {
    super({
      tag: 'div',
      classes: [classes.car_way],
    });
    const parser = new DOMParser();
    const svgElement = parser
      .parseFromString(finishFlag, 'image/svg+xml')
      .querySelector('svg');
    svgElement?.classList.add(classes.finish);
    this.appendChildren(svgElement);
  }
}
