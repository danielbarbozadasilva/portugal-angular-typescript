// =======================
// models.ts
// =======================

// ACTIVITY
export type ActivityCategory = 'Passeio' | 'Excursão' | 'Evento' | 'Outro';

export interface ILocationCoordinates {
  type: string;
  coordinates: number[];
}

export interface IActivity {
  locationCoordinates: ILocationCoordinates;
  _id: string;
  name: string;
  description: string;
  shortDescription: string;
  startDate: Date | string; // Mantido como Date | string para flexibilidade
  endDate: Date | string;   // Mantido como Date | string para flexibilidade
  location: string;
  meetingPoint?: string;    // Marcado como opcional
  price: number;
  featured: boolean;
  promotion?: string;       // Adicionado campo opcional
  images: string[];
  videos?: string[];        // Marcado como opcional
  totalSlots: number;
  bookedSlots: number;
  available: boolean;
  notes?: string;           // Marcado como opcional
  category: ActivityCategory;
  language?: string;        // Adicionado campo opcional
  agent: string[];          // IDs de agentes
  rating: string[];         // IDs de avaliações
  likes: string[];          // IDs de usuários que curtiram
  client: string[];         // IDs de clientes
  groups: string[];         // IDs de grupos
  shareCount: number;
  allowedPaymentMethods: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  averageRating?: number;   // Pode ser calculado no frontend/backend
}

export interface IActivityFilters {
  keyword: string;
  category: string;
  startDate: string;
  endDate: string;
  minPrice: string;
  maxPrice: string;
  language: string;
  lat: string;
  lng: string;
  sort: string;
}

// AGENT
export type AgentType = 'Pessoa Física' | 'Pessoa Jurídica';
export type AgentStatus = 'Ativo' | 'Inativo' | 'Pendente';
export type AccountType = 'Conta Corrente' | 'Poupança';
export type PaymentGateway = 'Stripe' | 'PayPal' | 'Outro';

export interface IAgentPaymentPreferences {
  preferredGateway?: PaymentGateway;
  accountDetails?: { [key: string]: any }; // Simplificado para o frontend
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
  paymentPreferences?: IAgentPaymentPreferences;
  preferredGateway?: PaymentGateway;
  accountDetails?: { [key: string]: any };
  createdAt?: Date | string;
  updatedAt?: Date | string;
  averageRating?: number;
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
  paymentPreferences?: IAgentPaymentPreferences;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  averageRating?: number;
}

// USER (Exemplo de interface de usuário; supondo que exista um arquivo models.user.ts ou algo similar)
export interface IUser {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  // Adicione quaisquer campos extras necessários
}

// DATA RESPONSE, AUTH, TOKEN
export interface IDataResponse {
  success: boolean;
  message?: string;
  data?: any; // Para simplificar; ideal seria usar tipos específicos
}

export interface IAuthData {
  token: string;
  user: IUser;
  // Adicione outros campos relevantes, como refresh token, data de expiração etc.
}

export interface IAuthResponse extends IDataResponse {
  data: IAuthData;
}

export interface ITokenResponse {
  success: boolean;
  message?: string;
  token?: string; // Para respostas de refresh
  valid?: boolean; // Para checar se o token é válido
}

export interface IAuthParams {
  email?: string;
  password?: string;
  _id?: string;
  token?: string;
  recoveryCode?: string;
  newPassword?: string;
}

// GROUP
export interface IGroup {
  _id: string;
  name: string;
  members: string[];
  activity: string;    // ID da Activity
  createdBy: string;   // ID do criador (usuário/agent)
  createdAt: string;
  updatedAt: string;
}

// ORDER
export interface IOrder {
  _id?: string;
  solicitation: string; // ID da Solicitation
  type: string;
  situation: string;
  date?: Date | string;
  payload: any[];      // Ou crie uma interface específica se tiver shape fixo
  voucher?: string;
  used?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// PAYMENT
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface IPayment {
  _id?: string;
  order: string;        // ID da Order
  price: number;
  type: string;
  installments: number;
  status: PaymentStatus;
  address?: any;        // Pode ter interface específica
  card?: any;           // Idem
  addressDeliveryIgualCharging?: boolean;
  gatewayTransactionId?: string;
  gatewayData?: any;
  paymentDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PaymentMethodType = 'credit_card' | 'debit_card' | 'bank_account' | 'paypal_account';
export type PaymentMethodBrand = 'Visa' | 'Mastercard' | 'American Express' | 'Elo' | 'Other';

export interface IPaymentMethod {
  _id?: string;
  client: string;         // ID do cliente
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

// SOLICITATION + CART ITEM
export interface ISolicitationCartItem {
  _id?: string;
  activity: string;
  name: string;
  description: string;
  shortDescription: string;
  startDate: Date | string;
  endDate: Date | string;
  location: string;
  meetingPoint: string;
  price: number;
  featured: boolean;
  promotion?: string;
  images: string[];
  videos?: string[];
  totalSlots: number;
  bookedSlots: number;
  available: boolean;
  notes?: string;
  category: string;
  agent: string[];
  rating: string[];
  likes: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISolicitation {
  _id?: string;
  cart: ISolicitationCartItem[];
  solicitationNumber: string;
  client: string;       // ID do cliente
  order?: string;       // ID da Order associada
  canceled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
