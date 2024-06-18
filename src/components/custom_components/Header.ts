import { Props } from '@/customTypes/types';
import BaseComponent from '../BaseComponent';

export default class Header extends BaseComponent<HTMLHeadElement> {
  constructor(props: Props) {
    super({
      tag: 'h1',
      ...props,
    });
  }
}
