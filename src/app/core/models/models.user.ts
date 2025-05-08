export type UserType = 'administrator' | 'client' | 'agent' | 'manager' | 'support' | 'developer';

export interface IUser {
  _id: string;
  hash?: string; // Made optional as it might not always be sent to frontend
  salt?: string; // Made optional
  name: string;
  email: string;
  username: string;
  permissions: UserType[];
  recovery?: {
    token?: string;
    date?: Date;
  };
  refreshToken?: {
    data: string;
    expiresIn: number;
    iv: string;
  };
  passwordRecoveryCode?: string; // Adicionado campo opcional do backend
  createdAt?: Date;
  updatedAt?: Date;
  wasNew?: any;
}
export interface IAuthStatus {
  isAuthenticated: boolean;
  user: IUser;
  loading: boolean;
  error: any;
}
export interface IPaginatedResponse<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
