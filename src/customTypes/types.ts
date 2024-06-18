export type CallbackType = (event: Event | DragEvent) => void;

export interface EventInterface {
  callback?: CallbackType;
  eventType?: Event['type'] | DragEvent['type'];
}
export type Props<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'style' | 'dataset' | 'classList' | 'children' | 'tagName'>
> & {
  txt?: string;
  classes?: string[];
  tag?: keyof HTMLElementTagNameMap;
  events?: EventInterface[];
};

export type ElementFnProps<T extends HTMLElement = HTMLElement> = Omit<
  Props<T>,
  'tag'
>;

export interface CarInfo {
  name: string;
  color?: string;
  id?: string;
}

export interface pageInfo {
  carsInfo: CarInfo[] | WinnerInfo[];
  pageNumber: number;
}

export interface WinnerInfo extends CarInfo {
  time: string;
  wins: string;
}

export type HandleDataCallback = (data: CarInfo) => void;

export type urls = 'garage' | 'winners' | 'engine';

export interface EngineProperties {
  velocity: number;
  distance: number;
}

export type Order = 'ASC' | 'DESC';

export type Sort = 'id' | 'wins' | 'time';
