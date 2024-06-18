import BaseComponent from '@/components/BaseComponent';
import classes from './GarageView.module.scss';
import CarList from './car_list/CarList';
import CarForm from './car_form/CarForm';
import { CarInfo, HandleDataCallback, WinnerInfo } from '@/customTypes/types';
import Modal from '../custom_components/modal/Modal';

export default class GarageView extends BaseComponent<HTMLDivElement> {
  private carList: CarList;

  private carForm: CarForm;

  private cars: CarInfo[] = [];

  private callback: (item: WinnerInfo) => void;

  static modal = new Modal();

  constructor(
    props: CarInfo[], 
    totalCount: number, 
    createCar: HandleDataCallback,
    updateCar: HandleDataCallback,
    updateWinnerTable: (item: WinnerInfo) => void
  ) {
    super({
      tag: 'div',
      classes: [classes.garage],
    });
    this.carForm = new CarForm(
      createCar,
      updateCar,
      this.animatePage.bind(this),
      this.resetCars.bind(this),
    );
    this.carList = new CarList(props, totalCount);
    this.cars.push(...props);
    this.appendChildren(this.carForm, this.carList, GarageView.modal);
    this.callback = updateWinnerTable;
  }

  public createCarItem(data: CarInfo) {
    this.carList.createCarItem(data);
  }

  public updateCarItem(color: string, id: string) {
    const carItem = this.carList.getCarItem(id);
    carItem?.update(color);
  }

  static openModal(props: {
    carInfo: CarInfo,
    time: number,
  }) {
    this.modal.open(props);
  }

  public async animatePage() {
    const items = await this.carList.animatePageItems();
    if (items.length === 0) {
      return;
    }

    let smallestItem = await items[0];
    let smallestTime = smallestItem?.time;

    for (let i = 1; i < items.length; i++) {
        const currentItem = await items[i];
        const currentTime = currentItem?.time;
        if (currentTime! < smallestTime!) {
            smallestItem = currentItem;
            smallestTime = currentTime;
        }
    }
    console.log(smallestItem)
    if (smallestItem !== undefined) {
      this.callback({
        id: smallestItem.id,
        name: smallestItem.name,
        time: smallestItem.time.toString(),
        wins: '1'
      });
    }

}

  private resetCars() {
    this.carList.resetPageAnimation();
  }

}
