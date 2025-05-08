export interface IResponseAuthSignIn {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    token: string;
    name: string;
    email: string;
    username: string;
    permissions: string[];
  } | {};
}

export interface IResponseAuthSignOut {
  status: number;
  success: boolean;
  message: string;
  data: {};
}
export interface IAuthParams {
  email: string;
  recoveryCode: string;
  newPassword: string;
}
export interface IResponseAuthRefreshToken {
  status: number;
  success: boolean;
  message: string;
  data: {
    token: string,
    refreshToken: string
  } | {};
}

export interface IResponseAuthTokenValid {
  status: number;
  success: boolean;
  message: string;
  data: {
    valid: boolean,
  };
}

export interface IResponseAuthRecoveryPassword {
  status: number;
  success: boolean;
  message: string;
  data: {
    recovery: boolean,
  };
}

export interface IResponseAuthResetPassword {
  status: number;
  success: boolean;
  message: string;
  data: {
    reseted: boolean,
  };
}

export interface IAuthParams {
  email: string;
  password: string;
}

export interface ICheckTokenParams {
  token: string;
}

export interface IResetPasswordParams{
  email: string;
  recoveryCode: string;
  newPassword: string;
}

export interface IDataModel {
  token: string;
  name: string;
  email: string;
  username: string;
  permissions: string;
}

export interface IRefreshToken {
  status: number;
  success: boolean;
  message: string;
  data: {
    token: string,
    refreshToken: string
  } | {};
}
