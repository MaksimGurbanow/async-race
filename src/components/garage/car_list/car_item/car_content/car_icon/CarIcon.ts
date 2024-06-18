import BaseComponent from '@/components/BaseComponent';
import car from '@/assets/car.svg';
import classes from './CarIcon.module.scss';

export default class CarIcon extends BaseComponent<HTMLDivElement> {
  private SVGElement: SVGSVGElement | null = null;

  constructor(props: { color: string }) {
    const { color } = props;
    super({
      tag: 'div',
      classes: [classes.car_icon],
    });
    const parser = new DOMParser();
    this.SVGElement = parser
      .parseFromString(car, 'image/svg+xml')
      .querySelector('svg');
    this.SVGElement?.setAttribute('fill', color);
    this.appendChildren(this.SVGElement);
  }

  public update(color: string) {
    this.SVGElement?.setAttribute('fill', color);
  }

  public getCurrentPosition() {
    if (this.element instanceof HTMLElement) { 
      return this.element?.getBoundingClientRect();
    }
  }
}
