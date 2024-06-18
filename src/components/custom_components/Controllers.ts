import BaseComponent from '@/components/BaseComponent';
import { Props } from '@/customTypes/types';

export default class Controllers extends BaseComponent<HTMLDivElement> {
  constructor(
    props: Props,
    ...children: (HTMLElement | BaseComponent<HTMLElement> | null)[]
  ) {
    super({
      ...props,
      tag: 'div',
    });
    this.appendChildren(...children);
  }
}
