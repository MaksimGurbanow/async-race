import BaseComponent from '@/components/BaseComponent';
import CarItem from './car_item/CarItem';
import Header from '@/components/custom_components/Header';
import classes from './CarPage.module.scss';
import { CarInfo, pageInfo } from '@/customTypes/types';

export default class CarPage extends BaseComponent<HTMLDivElement> {
  private carItems: CarItem[];

  private header: Header;

  constructor(
    props: pageInfo, 
    deleteCarHandler: (id: string) => void,
    ) {
    const { pageNumber, carsInfo } = props;
    super({
      tag: 'div',
      classes: [classes.car_page],
    });
    this.header = new Header({
      tag: 'h3',
      txt: `Page #${pageNumber}`,
    });
    this.element?.setAttribute('pageNumber', pageNumber.toString());
    this.carItems = carsInfo.map((carInfo) => new CarItem(carInfo, deleteCarHandler));
    this.appendChildren(this.header, ...this.carItems);
  }

  public getCarItem(id: string) {
    return this.carItems.find((carItem) => carItem.getId() == id);
  }

  public addItem(item: CarItem) {
    this.carItems.push(item);
  }

  public removeItem(id: string) {
    const index = this.carItems.findIndex((carItem) => carItem.getId() == id);
    if (index !== -1) {
      const removedItemElement = this.carItems[index].getElement();
      if (removedItemElement && removedItemElement.parentElement) {
        removedItemElement.parentElement.removeChild(removedItemElement);
      }
      this.carItems.splice(index, 1);
    }
  }

  public getItems() {
    return this.carItems;
  }

  public async animateItems() {
    return await this.carItems.map((item) => item.animate());
  }

  public resetAnimation() {
    this.carItems.forEach((item) => item.reset());
  }
}
