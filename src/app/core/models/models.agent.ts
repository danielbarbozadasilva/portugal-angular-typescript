export type AgentType = 'Pessoa Física' | 'Pessoa Jurídica';
export type AgentStatus = 'Ativo' | 'Inativo' | 'Pendente';
export type AccountType = 'Conta Corrente' | 'Poupança';
export type PaymentGateway = 'Stripe' | 'PayPal' | 'Outro';

export interface IAgent {
  _id?: string;
  user?: string;
  agentType: AgentType;
  companyName?: string;
  tradeName?: string;
  cnpj?: string;
  fullName?: string;
  cpf?: string;
  rg?: string;
  birthDate?: Date;
  primaryEmail: string;
  secondaryEmail?: string;
  landlinePhone?: string;
  mobilePhone: string;
  whatsapp?: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  cadastur?: string;
  defaultCommission: number;
  agentStatus: AgentStatus;
  approved?: boolean;
  specialty?: string;
  contact?: string;
  notes?: string;
  bank?: string;
  bankAgency?: string;
  bankAccount?: string;
  accountType?: AccountType;
  accountHolder?: string;
  paymentPreferences?: {
    preferredGateway?: PaymentGateway;
    accountDetails?: {
      [key: string]: any;
    };
  };
  createdAt?: Date;
  updatedAt?: Date;
}
