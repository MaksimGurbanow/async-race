import BaseComponent from '@/components/BaseComponent';
import { WinnerInfo } from '@/customTypes/types';
import classes from './WinnerItem.module.scss';
import Cell from '@/components/custom_components/cell/Cell';

export default class WinnerItem extends BaseComponent<HTMLDivElement> {
  private idCell: Cell;

  private winsCell: Cell;
  
  private nameCell: Cell;
  
  private timeCell: Cell;

  constructor(props: WinnerInfo) {
    const { id, wins, name, time } = props;
    super({
      tag: 'div',
      classes: [classes.car_item],
      id,
    });
    this.idCell = new Cell({ txt: id })
    this.winsCell = new Cell({ txt: wins })
    this.nameCell = new Cell({ txt: name })
    this.timeCell = new Cell({ txt: time })
    this.appendChildren(
      this.idCell,
      this.winsCell,
      this.nameCell,
      this.timeCell,
    )
  }

  public update(info: WinnerInfo) {
    const time = parseInt(info.time) / 1000;
    this.winsCell.setTextContent(info.wins);
    this.nameCell.setTextContent(info.name);
    this.timeCell.setTextContent(time.toString());
  }

  public getId() {
    return this.element?.id;
  }
}
