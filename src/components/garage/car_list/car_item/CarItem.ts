import BaseComponent from '@/components/BaseComponent';
import classes from './CarItem.module.scss';
import CarContent from './car_content/CarContent';
import CarHeading from './car_heading/CarHeading';
import { CarInfo } from '@/customTypes/types';
import deleteData from '@/utils/deleteData';

export default class CarItem extends BaseComponent<HTMLDivElement> {
  private heading: CarHeading;

  private content: CarContent;

  constructor(props: CarInfo, deleteItem: (id: string) => void) {
    const { name, color, id } = props;
    super({
      tag: 'div',
      classes: [classes.car_item],
      id,
    });
    this.heading = new CarHeading({
      name,
      callback: () => {
        if (id) {
          deleteItem(id)
        }
      }
    });
    this.content = new CarContent({
      name,
      color: color || '',
      id: id || '',
    });
    this.appendChildren(this.heading, this.content);
    if (this.element && id) {
      this.element.id = id;
    }
  }

  public update(color: string) {
    if (this.element) {
      this.content.update(color);
    }
  }

  public getId() {
    return this.element?.id;
  }

  public async animate() {
    return await this.content.animate();
  }

  public reset() {
    this.content.stop()
  }
}
