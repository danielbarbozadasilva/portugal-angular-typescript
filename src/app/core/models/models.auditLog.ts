export interface IAuditLog {
  _id?: string;
  event: string;
  user: string;
  data?: any;
  createdAt?: Date;
}
