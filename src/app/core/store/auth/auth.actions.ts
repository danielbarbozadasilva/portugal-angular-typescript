import { createAction, props } from '@ngrx/store';
import {
  IApiResponse,
  IDataResponse,
  IUser,
  IAuthCredentials,
  IAuthData,
  IErrorDetails, // Importe se for usar em IApiResponse<IErrorDetails> para erros
} from '@app/core/models/models.index'; // Ajuste o caminho!
import { IResponseAuthSignIn } from '@app/core/models/models.auth';

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


export class AuthActions {
  private constructor() {}

  public static readonly signIn = createAction('[Auth] Sign In', props<{ credentials: IAuthCredentials }>());

  public static readonly signInSuccess = createAction(
    '[Auth] Sign In Success',
    props<{ response: IApiResponse<IResponseAuthSignIn> }>()
  );

  public static readonly signInFailure = createAction(
    '[Auth] Sign In Failure',
    props<{ error: <IResponseAuthSignIn> }>()
  );

  public static readonly logout = createAction('[Auth] Logout', props<{ userId: string }>());

  public static readonly logoutSuccess = createAction('[Auth] Logout Success');

  public static readonly logoutFailure = createAction(
    '[Auth] Logout Failure',
    props<{ error: IApiResponse<unknown> | string }>()
  );

  public static readonly refreshToken = createAction('[Auth] Refresh Token', props<{ userId: string }>());

  public static readonly refreshTokenSuccess = createAction(
    '[Auth] Refresh Token Success',
    props<{ newToken: string }>()
  );

  public static readonly refreshTokenFailure = createAction(
    '[Auth] Refresh Token Failure',
    props<{ error: IApiResponse<unknown> | string }>()
  );

  public static readonly checkToken = createAction('[Auth] Check Token', props<{ token: string }>());

  public static readonly checkTokenSuccess = createAction(
    '[Auth] Check Token Success',
    props<{ valid: boolean; user?: IUser | null }>()
  );

  public static readonly checkTokenFailure = createAction(
    '[Auth] Check Token Failure',
    props<{ error: IApiResponse<unknown> | string }>()
  );

  public static readonly clearAuthError = createAction('[Auth] Clear Auth Error');

  public static readonly recoveryPassword = createAction('[Auth] Recovery Password', props<{ email: string }>());

  public static readonly recoveryPasswordSuccess = createAction(
    '[Auth] Recovery Password Success',
    props<{ response: IDataResponse }>()
  );

  public static readonly recoveryPasswordFailure = createAction(
    '[Auth] Recovery Password Failure',
    props<{ error: IApiResponse<unknown> | string }>()
  );
}
