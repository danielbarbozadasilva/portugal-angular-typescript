import { UserType } from './models.index'; // Assuming userTypes is defined here or elsewhere

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
  createdAt?: Date; // Made optional
  updatedAt?: Date; // Made optional
  wasNew?: any;
}
