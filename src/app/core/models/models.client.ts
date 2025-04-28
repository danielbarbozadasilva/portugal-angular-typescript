export interface IClient {
  _id?: string;
  user: string; // ID do usuário
  name: string;
  birthDate: Date;
  country?: string;
  documentType?: string;
  documentValue?: string;
  phones: string[];
  address: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
  cpf?: string;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  paymentMethods?: string[];
  interests?: string[];
}

export interface IResponse<T> {
  data: T;
  message?: string;
}
