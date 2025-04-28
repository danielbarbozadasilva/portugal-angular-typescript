export interface IAgent {
  _id: string;
  name: string;
  email: string;
  agentType: 'Pessoa Física' | 'Pessoa Jurídica' | string; // Use specific types or string
  cpf?: string;
  cnpj?: string;
  companyName?: string;
  tradeName?: string;
  country: string;
  mobilePhone: string;
  whatsapp?: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  bank?: string;
  bankAgency?: string;
  bankAccount?: string;
  accountType?: 'Conta Corrente' | 'Poupança' | string;
  // Add other fields from IUser if agents are also users, or relate them via userId
  userId?: string; // Example relation
  createdAt?: Date;
  updatedAt?: Date;
  averageRating?: number;
}

export interface IAgentRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date;
  agentType: 'Pessoa Física' | 'Pessoa Jurídica' | string;
  cpf?: string;
  cnpj?: string;
  companyName?: string;
  tradeName?: string;
  country: string;
  mobilePhone: string;
  whatsapp?: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  bank?: string;
  bankAgency?: string;
  bankAccount?: string;
  accountType?: 'Conta Corrente' | 'Poupança' | string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  averageRating?: number;
}
