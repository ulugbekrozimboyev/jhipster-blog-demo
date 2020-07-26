import { Moment } from 'moment';

export interface IBlog {
  id?: number;
  title?: string;
  alias?: string;
  mainImg?: string;
  content?: string;
  createdAt?: Moment;
  createdBy?: number;
}

export const defaultValue: Readonly<IBlog> = {};
