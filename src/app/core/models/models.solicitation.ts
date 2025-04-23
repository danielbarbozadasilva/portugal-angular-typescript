import { ISolicitationCartItem } from './models.solicitationCartItem';

export interface ISolicitation {
  _id?: string;
  cart: ISolicitationCartItem[];
  solicitationNumber: string;
  client: string;
  order?: string; 
  canceled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
