export interface IOrder {
  _id?: string;
  solicitation: string; // Solicitation ID
  type: string;
  situation: string;
  date?: Date | string; // Mantido como Date | string
  payload: any[]; // Alterado de any para any[] para corresponder ao backend
  voucher?: string;
  used?: boolean;
  createdAt?: Date | string; // Mantido como Date | string
  updatedAt?: Date | string; // Mantido como Date | string
}
