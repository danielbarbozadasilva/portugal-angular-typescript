export interface IAuditLog {
  _id?: string;
  event: string;
  user: string; // ID do usuário
  data?: any;
  createdAt?: Date;
}
