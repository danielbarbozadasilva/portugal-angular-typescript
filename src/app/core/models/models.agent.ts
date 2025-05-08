export type AgentType = 'Pessoa Física' | 'Pessoa Jurídica';
export type AgentStatus = 'Ativo' | 'Inativo' | 'Pendente';
export type AccountType = 'Conta Corrente' | 'Poupança';
export type PaymentGateway = 'Stripe' | 'PayPal' | 'Outro';

export interface IAgentPaymentPreferences {
  preferredGateway?: PaymentGateway;
  accountDetails?: { [key: string]: any }; // Simplificado para frontend
}

export interface IAgentData {
  password?: string;
  confirmPassword?: string;
  agentType: AgentType;
  companyName?: string;
  tradeName?: string;
  cnpj?: string;
  fullName?: string;
  cpf?: string;
  rg?: string;
  birthDate?: string;
  primaryEmail: string;
  secondaryEmail?: string;
  landlinePhone?: string;
  mobilePhone: string;
  whatsapp?: string;
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  };
  cadastur?: string;
  defaultCommission: number;
  agentStatus: AgentStatus;
  approved: boolean;
  specialty?: string;
  contact?: string;
  notes?: string;
  bank?: string;
  bankAgency?: string;
  bankAccount?: string;
  accountType?: AccountType;
  accountHolder?: string;
  paymentPreferences?: IAgentPaymentPreferences; // Usando interface aninhada
  preferredGateway?: PaymentGateway;
  accountDetails?: { [key: string]: any }; // Simplificado para frontend
  createdAt?: Date | string;
  updatedAt?: Date | string;
  averageRating?: number; // Mantido do frontend original
}

export interface IAgent {
  _id: string;
  user: string; // ID do usuário relacionado
  agentType: AgentType;
  companyName?: string;
  tradeName?: string;
  cnpj?: string;
  fullName?: string;
  cpf?: string;
  rg?: string;
  birthDate?: string;
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
  approved: boolean;
  specialty?: string;
  contact?: string;
  notes?: string;
  bank?: string;
  bankAgency?: string;
  bankAccount?: string;
  accountType?: AccountType;
  accountHolder?: string;
  paymentPreferences?: IAgentPaymentPreferences; // Usando interface aninhada
  createdAt?: Date | string;
  updatedAt?: Date | string;
  averageRating?: number; // Mantido do frontend original
}

// Removida a interface IAgentRequest pois IAgent agora cobre todos os campos.
// Se um DTO específico para criação for necessário, pode ser criado separadamente.
