export type UserType = 'administrator' | 'client' | 'agent' | 'manager' | 'support' | 'developer';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  username: string;
  permissions: UserType[];
  hash?: string;
  salt?: string;
  recovery?: {
    token?: string;
    date?: Date;
  };
  refreshToken?: {
    data: string;
    expiresIn: number;
    iv: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  passwordRecoveryCode?: string;
}

export interface IAuthResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    token: string;
    username: string;
    name: string;
    email: string;
    permissions: string;
  };
}
