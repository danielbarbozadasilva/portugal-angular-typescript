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
