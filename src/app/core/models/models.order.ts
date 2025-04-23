export interface IOrder {
  _id?: string;
  solicitation: string;
  type: string;
  situation: string;
  date?: Date;
  payload: any;
  voucher?: string;
  used?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
