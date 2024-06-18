import { Props } from '@/customTypes/types';

export default class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected element: T | null;

  constructor(
    props: Props<T>,
    ...children: (BaseComponent | HTMLElement | null)[]
  ) {
    this.element = null;
    this.createElement(props);
    if (children) {
      this.appendChildren(...children);
    }
  }

  protected createElement(props: Props<T>) {
    const tag = props.tag ?? 'div';
    this.element = document.createElement(tag) as T;
    this.addClasses(props.classes);
    this.setTextContent(props.txt);
    this.setCallback(props.events);
  }

  public addClasses(classes?: string[]) {
    classes?.map((className) => this.element?.classList.add(className));
  }

  public removeClass(className: string) {
    this.element?.classList.remove(className);
  }

  public toggleClass(className: string) {
    this.element?.classList.toggle(className);
  }

  public setTextContent(text: string = '') {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  protected setCallback(events: Props['events']) {
    events?.forEach((event) => {
      const { callback, eventType } = event;
      if (typeof callback === 'function' && eventType) {
        this.element?.addEventListener(eventType, callback);
      }
    });
  }

  public appendChildren(
    ...children: (BaseComponent | HTMLElement | SVGSVGElement | null)[]
  ) {
    children
      .filter((child) => child !== null)
      .forEach((child) => {
        if (child instanceof BaseComponent) {
          const childElement = child.getElement();
          if (childElement) {
            this.element?.appendChild(childElement);
          }
        } else if (child instanceof HTMLElement) {
          this.element?.appendChild(child);
        } else if (child instanceof SVGSVGElement) {
          this.element?.append(child);
        }
      });
  }

  public getChildren() {
    return this.element?.children || [];
  }

  public moveChild(item: (BaseComponent | HTMLElement )) {
    if (item instanceof BaseComponent) {
      this.element?.appendChild(item.getElement());
    }
  }

  public getElement() {
    return this.element as Node;
  }
}
