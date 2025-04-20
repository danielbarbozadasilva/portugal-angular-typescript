export type UserType = 'administrator' | 'client' | 'agent' | 'manager' | 'support' | 'developer';

export interface IAuth {
  status: number;
  success: boolean;
  message: string;
  data: {
    resultUserMapper: UserMapper;
    resultGenerateToken: TokenResult;
  };
}

interface UserMapper {
  _id: string;
  username: string;
  name: string;
  email: string;
  permissions: string;
}

interface TokenResult {
  auth: boolean;
  token: string;
  refreshToken: string;
}

export interface IAuthResponse {
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
