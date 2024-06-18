import BaseComponent from '@/components/BaseComponent';
import WinnerList from './winner_list/WinnerList';
import { WinnerInfo } from '@/customTypes/types';
import classes from './WinnerView.module.scss';

export default class WinnerView extends BaseComponent<HTMLDivElement> {
  private winnerList: WinnerList;

  constructor(winners: WinnerInfo[], totalCount: number) {
    super({
      tag: 'div',
      classes: [classes.winner_view],
    });
    this.winnerList = new WinnerList(winners, totalCount);

    this.appendChildren(this.winnerList);
  }

  public addItem(item: WinnerInfo) {
    this.winnerList.createWinnerItem(item);
  }

  public updateItem(item: WinnerInfo) {
    this.winnerList.updateWinnerItem(item);
  }

}
