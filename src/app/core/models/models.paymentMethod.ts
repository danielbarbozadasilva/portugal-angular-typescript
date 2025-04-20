export type PaymentMethodType = 'credit_card' | 'debit_card' | 'bank_account' | 'paypal_account';
export type PaymentMethodBrand = 'Visa' | 'Mastercard' | 'American Express' | 'Elo' | 'Other';

export interface IPaymentMethod {
  _id?: string;
  client: string;  // ID do Client
  type: PaymentMethodType;
  brand?: PaymentMethodBrand;
  last4?: string;
  expMonth?: number;
  expYear?: number;
  fingerprint?: string;
  isValid: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
