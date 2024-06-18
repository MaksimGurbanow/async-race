import { CarInfo, WinnerInfo } from '@/customTypes/types';
import BaseComponent from "@/components/BaseComponent";
import Header from "@/components/custom_components/Header";
import WinnerPage from "./winner_page/WinnerPage";
import classes from './WinnerList.module.scss';
import Controllers from "@/components/custom_components/Controllers";
import Button from "@/components/custom_components/button/Button";

export default class WinnerList extends BaseComponent<HTMLDivElement> {
  private header: Header;

  private winnerPages: WinnerPage[] = [];

  private currentPage: number = 0;

  private pageNumber: number = 1;

  private controllers: Controllers;

  private totalCount: number = 0;

  constructor(winners: WinnerInfo[], totalCount: number) {
    super({
      tag: 'div',
      classes: [classes.list],
    });
    this.totalCount = totalCount;
    this.header = new Header({
      tag: 'h1',
      txt: `Winners (${totalCount})`,
      classes: [classes.header],
    });
    this.controllers = new Controllers({ classes: [classes.controllers] });
    this.controllers.appendChildren(
      new Button({ txt: '<' }),
      new Button({ txt: '>' }),
    );
    this.winnerPages.push(new WinnerPage({ carsInfo: winners, pageNumber: this.currentPage}))
    this.appendChildren(this.header, ...this.winnerPages, this.controllers)
  }

  public createWinnerItem(item: WinnerInfo) {
    this.totalCount = this.totalCount + 1;
    this.header.setTextContent(`Garage (${this.totalCount})`);
    const lastPage = this.winnerPages[this.winnerPages.length - 1];
    if (lastPage.getItems().length < 7) {
      lastPage.addItem(item);
    } else {
      this.pageNumber += 1;
      const newPage = new WinnerPage({
        pageNumber: this.pageNumber,
        carsInfo: [item],
      })
    }
  }

  public updateWinnerItem(item: WinnerInfo) {
    this.winnerPages.forEach((winnerPage) => {
      winnerPage.getItems().forEach((winnerItem) => {
        if (winnerItem.getId() == item.id) {
          winnerItem.update(item);
        }
      });
    });
  }
}
