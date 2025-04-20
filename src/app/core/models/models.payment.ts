export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface IPayment {
  _id?: string;
  order: string; // ID do Order
  price: number;
  type: string;
  installments: number;
  status: PaymentStatus;
  address?: any;
  card?: any;
  addressDeliveryIgualCharging?: boolean;
  gatewayTransactionId?: string;
  gatewayData?: any;
  paymentDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
