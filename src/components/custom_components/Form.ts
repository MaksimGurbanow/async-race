import { CarInfo } from '@/customTypes/types';
import BaseComponent from '@/components/BaseComponent';
import { Props } from '@/customTypes/types';
import Input from './Input';
import Button from './button/Button';

interface FormProps extends Props<HTMLFormElement> {
  txt?: string;
  buttonCallback: (data: CarInfo) => void;
}

export default class Form extends BaseComponent<HTMLFormElement> {
  private button: Button;

  private nameInput: Input;

  private colorInput: Input;

  private nameValue: string = '';

  private colorValue: string = '';

  constructor(props: FormProps) {
    const { txt, buttonCallback } = props;
    super({
      txt: '',
      tag: 'form',
    });
    this.button = new Button({
      txt,
      events: [
        {
          eventType: 'click',
          callback: (e) => {
            e.preventDefault();
            if (this.nameValue && this.colorValue) {
              buttonCallback({ name: this.nameValue, color: this.colorValue });
            }
          },
        },
      ],
    });
    this.nameInput = new Input({
      placeholder: 'car name',
      setValue: this.setName.bind(this),
    });
    this.colorInput = new Input({
      placeholder: 'type color in HEX format',
      setValue: this.setColor.bind(this),
      type: 'color',
    });
    this.appendChildren(this.button, this.nameInput, this.colorInput);
  }

  private setName(value: string) {
    this.nameValue = value;
  }

  private setColor(value: string) {
    this.colorValue = value;
  }
}
