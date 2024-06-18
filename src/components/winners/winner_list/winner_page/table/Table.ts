import BaseComponent from '@/components/BaseComponent';
import WinnerItem from './winner_item/WinnerItem';
import { WinnerInfo } from '@/customTypes/types';
import classes from './Table.module.scss';
import Cell from '@/components/custom_components/cell/Cell';

export default class Table extends BaseComponent<HTMLDivElement> {
  private properties: BaseComponent;

  private winnerItems: WinnerItem[];

  constructor(props: WinnerInfo[]) {
    super({
      tag: 'div',
      classes: [classes.table],
    });
    this.properties = new BaseComponent({ classes: [classes.properties] });
    this.properties.appendChildren(
      new Cell({ txt: 'id' }),
      new Cell({ txt: 'wins' }),
      new Cell({ txt: 'name' }),
      new Cell({ txt: 'best time' }),
    );
    this.winnerItems = props.map((prop) => new WinnerItem(prop));
    this.appendChildren(this.properties, ...this.winnerItems);
  }

  public getItems() {
    return this.winnerItems;
  }

  public addItem(itemInfo: WinnerInfo) {
    const item = new WinnerItem(itemInfo);
    this.winnerItems.push(item);
    this.appendChildren(item);
  }
}
