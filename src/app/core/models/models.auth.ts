import { IUser } from './models.user'; // Import IUser

// Interface for responses that contain data (can be shared)
export interface IDataResponse {
  success: boolean;
  message?: string;
  data?: any; // Use a specific type if possible
}

// Interface for login/logout response data
export interface IAuthData {
  token: string;
  user: IUser; // Use the specific IUser interface
  // Add other relevant fields like expiration, refresh token info, etc.
}

// Interface for the full login/logout response
export interface IAuthResponse extends IDataResponse {
  data: IAuthData;
}

// Interface for token-related responses (refresh, check)
export interface ITokenResponse {
  success: boolean;
  message?: string;
  token?: string; // For refresh token response
  valid?: boolean; // For check token response
}

// Interface for parameters used in auth service methods
export interface IAuthParams {
  email?: string;
  password?: string;
  _id?: string;
  token?: string;
  recoveryCode?: string;
  newPassword?: string;
}
