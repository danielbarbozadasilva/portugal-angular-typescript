export type DocumentType = 'RG' | 'CPF' | 'Passaporte' | 'Cédula de Identidade' | 'Outro';

export interface IAddress {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IClient {
  _id?: string;
  user: string;
  name: string;
  birthDate: string;
  country?: string;
  documentType?: string;
  documentValue?: string;
  phones: string[];
  address: IAddress;
  cpf?: string;
  deleted?: boolean;
  paymentMethods?: string[];
  interests?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
