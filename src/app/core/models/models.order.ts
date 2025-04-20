export interface IOrder {
  _id?: string;
  solicitation: string; // ID de Solicitation
  type: string;
  situation: string;
  date?: Date;
  payload: any;
  voucher?: string;
  used?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
