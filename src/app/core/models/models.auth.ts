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

export interface UserMapper {
  _id: string;
  username: string;
  name: string;
  email: string;
  permissions: string;
}

export interface TokenResult {
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

export interface IAuthParams {
  email: string;
  recoveryCode: string;
  newPassword: string;
}

export interface IDataResponse {
  status: number;
  success: boolean;
  message: string;
  data: Record<string, unknown>;
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

export interface IResponseError {
  success: boolean;
}

export interface ITokenResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    token: string;
    refreshToken: {
      data: string;
      expiresIn: number;
      iv: string;
    };
  };
}
