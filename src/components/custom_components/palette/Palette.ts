import BaseComponent from '@/components/BaseComponent';
import { Props } from '@/customTypes/types';

// todo: create palette controller

export default class Palette extends BaseComponent<HTMLDivElement> {
  constructor(props: Props) {
    super({
      ...props,
      tag: 'div',
    });
  }
}
