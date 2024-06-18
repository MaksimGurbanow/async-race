import { WinnerInfo } from './../../../../customTypes/types';
import BaseComponent from "@/components/BaseComponent";
import Header from "@/components/custom_components/Header";
import Table from "./table/Table";
import { pageInfo } from "@/customTypes/types";
import classes from './WinnerPage.module.scss'

export default class WinnerPage extends BaseComponent<HTMLDivElement> {
  private header: Header;

  private table: Table;

  constructor(props: pageInfo) {
    const { pageNumber, carsInfo } = props;
    super({
      tag: 'div',
      classes: [classes.page],
    });
    this.header = new Header({
      txt: `Page #${pageNumber}`,
    });
    this.table = new Table(carsInfo as WinnerInfo[]);
    this.appendChildren(this.header, this.table);
  }

  public getItems() {
    return this.table.getItems();
  }

  public addItem(itemInfo: WinnerInfo) {
    this.table.addItem(itemInfo)
  }

} 
