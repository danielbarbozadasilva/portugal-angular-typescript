import { ISolicitationCartItem } from './models.solicitationCartItem';

export interface ISolicitation {
  _id?: string;
  cart: ISolicitationCartItem[];  // array de itens
  solicitationNumber: string;
  client: string; // ID de Client
  order?: string; // ID de Order
  canceled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
