import BaseComponent from '@/components/BaseComponent';
import CarPage from './CarPage';
import Header from '@/components/custom_components/Header';
import Controllers from '@/components/custom_components/Controllers';
import Button from '@/components/custom_components/button/Button';
import classes from './CarList.module.scss';
import { CarInfo, WinnerInfo } from '@/customTypes/types';
import getData from '@/utils/getData';
import CarItem from './car_item/CarItem';
import deleteData from '@/utils/deleteData';
import fillPages from '@/utils/fillPages';

export default class CarList extends BaseComponent<HTMLDivElement> {
  private carPages: CarPage[] = [];

  private header: Header;

  private pageSwitchers: Controllers;

  private pagesWrapper: BaseComponent<HTMLDivElement>;

  private currentPageIndex = 0;

  private pageNumber = 1;

  private totalCount: number;

  constructor(
    carsInfo: CarInfo[], 
    totalCount: number,
    ) {
    super({
      tag: 'div',
      classes: [classes.car_list],
    });
    this.totalCount = totalCount
    this.header = new Header({ txt: `Garage (${totalCount})` });
    this.carPages.push(new CarPage(
      { pageNumber: this.pageNumber, carsInfo },
      this.deleteCarItem.bind(this),
    ));
    this.pageSwitchers = new Controllers({
      classes: [classes.page_switch_controllers],
    });
    this.pagesWrapper = new BaseComponent({ tag: 'div' });
    this.pagesWrapper.appendChildren(...this.carPages);
    this.pageSwitchers.appendChildren(
      new Button({ 
        txt: '<',
        events: [
          {
            eventType: 'click',
            callback: this.previousPage.bind(this),
          }
        ]
      }),
      new Button({ 
        txt: '>',
        events: [
          {
            eventType: 'click',
            callback: this.nextPage.bind(this)
          }
        ]
      }),
    );
    this.appendChildren(this.header, this.pagesWrapper, this.pageSwitchers);
    this.openPage();
  }

  public getCarItem(id: string) {
    return this.carPages[this.currentPageIndex].getCarItem(id);
  }

  private openPage() {
    this.carPages[this.currentPageIndex]?.addClasses([classes.active]);
  }

  public async animatePageItems() {
    return await this.carPages[this.currentPageIndex].animateItems();
  }

  public resetPageAnimation() {
    this.carPages[this.currentPageIndex].resetAnimation();
  }

  public async nextPage() {
    const currentPage = this.carPages[this.currentPageIndex];
    const nextPage = this.carPages[this.currentPageIndex + 1];
    if (!nextPage) { 
      const response = await getData('garage', (this.pageNumber + 1).toString());
      if (response && response.cars.length !== 0) {
        currentPage.toggleClass(classes.active);
        this.currentPageIndex += 1;
        this.pageNumber += 1;
        this.createPage(response.cars);
      }
    } else {
      currentPage.toggleClass(classes.active);
      nextPage.addClasses([classes.active]);
      this.currentPageIndex += 1;
    }
  }

  private createPage(cars: CarInfo[]) {
    const page = new CarPage(
      {carsInfo: cars, pageNumber: this.pageNumber},
      this.deleteCarItem.bind(this),
    )
    this.carPages.push(page);
    page.addClasses([classes.active]);
    this.pagesWrapper.appendChildren(page);
  }

  public async previousPage() {
    const currentPage = this.carPages[this.currentPageIndex];
    const previousPage = this.carPages[this.currentPageIndex - 1];
    if (previousPage) { 
      currentPage.toggleClass(classes.active);
      previousPage.addClasses([classes.active])
      this.currentPageIndex -= 1;
    }
  }

  public createCarItem(item: CarInfo) {
    const carItem = new CarItem(item, this.deleteCarItem.bind(this));
    this.totalCount = this.totalCount + 1;
    this.header.setTextContent(`Garage (${this.totalCount})`);
    const lastPage = this.carPages[this.pageNumber - 1];
    if (lastPage.getItems().length < 7) {
      lastPage.appendChildren(carItem);
      lastPage.addItem(carItem);
    }
  }

  public async deleteCarItem(id: string) {
    try {
      await deleteData('garage', id);
      const currentPage = this.carPages[this.currentPageIndex];
      const carItem = currentPage.getCarItem(id);
      if (carItem) {
        currentPage.removeItem(id);
        this.totalCount -= 1;
        this.header.setTextContent(`Garage (${this.totalCount})`);
        if (this.currentPageIndex < this.pageNumber - 1) {
          fillPages(this.carPages, this.currentPageIndex);
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
