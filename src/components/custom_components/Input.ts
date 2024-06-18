import BaseComponent from '@/components/BaseComponent';

export default class Input extends BaseComponent<HTMLInputElement> {
  constructor(props: {
    setValue?: (value: string) => void;
    placeholder?: string;
    type?: string;
  }) {
    const { setValue, placeholder, type } = props;
    super({
      tag: 'input',
      type,
      events: [
        {
          eventType: 'input',
          callback: (e) => {
            const { target } = e;
            if (target instanceof HTMLInputElement) {
              const { value } = target;
              if (setValue) {
                setValue(value);
              }
            }
          },
        },
      ],
    });
    if (this.element) {
      this.element.placeholder = placeholder || '';
      this.element.required = true;
      this.element.type = type || 'text';
    }
  }
}
