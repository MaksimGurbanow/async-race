import { Sort, Order } from './../customTypes/types';
import GarageView from '@/components/garage/GarageView';
import WinnerView from '@/components/winners/WinnersView';
import Button from './custom_components/button/Button';
import classes from './App.module.scss';
import { CarInfo, WinnerInfo } from '@/customTypes/types';
import getData from '@/utils/getData';
import postData from '@/utils/postData';
import updateData from '@/utils/updateData';
import getWinners from '@/utils/getWinners';
import updateWinner from '@/utils/updatewinner';
import createWinner from '@/utils/createWinner';

export default class App {
  private garageView: GarageView | null = null;

  private winnerView: WinnerView | null = null;

  private switchPagesButton: Button | null = null;

  private currentPage: string = '';

  private cars: CarInfo[] = [];

  private winners: WinnerInfo[] = [];

  private totalCarCount: number = 0;

  private totalWinnerCount: number = 0;

  private sort: Sort = 'id';

  private order: Order = 'ASC';

  constructor() {
    this.currentPage = 'winner';
    getData('garage', '1').then((v)=> {
      if (v) {
        this.cars.push(...v.cars);
        this.totalCarCount = parseInt(v.totalCount);
      }
      this.garageView = new GarageView(
        this.cars, 
        this.totalCarCount,
        this.createCar.bind(this),
        this.updateCar.bind(this),
        this.createWinner.bind(this),
      );
      getWinners('winners', '1', this.sort, this.order)
      .then((v) => {
        if (v) {
          v.cars.forEach((winner) => {
            const car = this.cars.find((car) => car.id === winner.id);
            this.winners.push({
              ...winner,
              name: car?.name || '',
              color: car?.color || '',
            })
          })
          this.totalWinnerCount = parseInt(v.totalCount);
        }
        this.winnerView = new WinnerView(this.winners, this.totalWinnerCount);
        this.switchPagesButton = new Button({ 
          txt: `Open ${this.currentPage} page`,
          events: [
            {
              eventType: 'click',
              callback: (e) => {
                this.currentPage = this.currentPage === 'garage' ? 'winner' : 'garage';
                this.garageView?.toggleClass(classes.active);
                this.winnerView?.toggleClass(classes.active);
                this.switchPagesButton?.setTextContent(`Open ${this.currentPage} page`);
              }
            }
          ]
        });
        this.garageView?.addClasses([classes.active]);
        this.render();
        })
    });

  }

  render() {
    const rootElement = document.getElementById('root');

    if (rootElement) {
      rootElement.innerHTML = '';
      if (this.switchPagesButton && this.garageView && this.winnerView) {
        rootElement.append(
          this.switchPagesButton.getElement(),
          this.garageView.getElement(),
          this.winnerView.getElement()
        );
      }
    } else {
      throw new Error('Root element not found');
    }
  }

  private async createCar(data: CarInfo) {
    const response = await postData('garage', data);
    if (response) {
      this.cars.push(response);
      this.garageView?.createCarItem(response);
    }
  }

  private async createWinner(data: WinnerInfo) {
    const winner = this.winners.find((winner) => winner.id === data.id);
    if (winner && winner.id) {
      const response = await updateWinner('winners', winner.id, winner);
      this.winnerView?.addItem(response);
    } else {
      const response = await createWinner('winners', {time: data.time, wins: '1', name: data.name});
      this.winnerView?.updateItem(response);
    }
  }

  private async updateCar(data: CarInfo) {
    const id = this.cars.find((car) => car.name === data.name.trim())?.id;
    if (data && id && data.color) {
      const response = await updateData('garage', id, { name: data.name.trim(), color: data.color.trim() });
      if (response && response.id && response.color) {
        const index = this.cars.findIndex((car) => car.id === response.id);
        if (index !== -1) {
          this.cars[index] = response;
          this.garageView?.updateCarItem(response.color, response.id);
        }
      }
    }
  }
}
