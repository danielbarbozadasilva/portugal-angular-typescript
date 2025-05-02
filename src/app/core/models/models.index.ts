import { IActivity, ILocationCoordinates, IActivityFilters } from './models.activity';
import { IAgent } from './models.agent';
import { IAuditLog } from './models.auditLog';
import { IAuthData, IAuthParams, IAuthResponse, IDataResponse, ITokenResponse } from './models.auth';
import { IClient } from './models.client';
import { IContentPage, ContentPageStatus } from './models.contentPage';
import { IGroup } from './models.group';
import { IOrder } from './models.order';
import { IPayment, PaymentStatus } from './models.payment';
import { IPaymentMethod, PaymentMethodBrand, PaymentMethodType } from './models.paymentMethod';
import { IRating } from './models.rating';
import { ISolicitation } from './models.solicitation';
import { ISolicitationCartItem } from './models.solicitationCartItem';
import { IPaginatedResponse, IUser, UserType } from './models.user';

export interface IResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
export interface IResponseError {
  success: boolean;
  message: string;
  error?: any;
}

export {
  IActivity,
  ILocationCoordinates,
  IActivityFilters,
  IAgent,
  IAuditLog,
  IAuthData,
  IAuthParams,
  IAuthResponse,
  IDataResponse,
  ITokenResponse,
  IClient,
  ContentPageStatus,
  IContentPage,
  IGroup,
  IOrder,
  IPayment,
  PaymentStatus,
  IPaymentMethod,
  PaymentMethodBrand,
  PaymentMethodType,
  IRating,
  ISolicitation,
  ISolicitationCartItem,
  IPaginatedResponse,
  IUser,
  UserType,
};
