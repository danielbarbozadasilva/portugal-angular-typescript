import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
import { ActivityState, activityReducer } from './activity/activity.reducer';
import { AgentState, agentReducer } from './agent/agent.reducer';
import { AuditLogState, auditLogReducer } from './auditlog/audit-log.reducer';
import { ClientState, clientReducer } from './client/client.reducer';
import { ContentPageState, contentPageReducer } from './content-page/content-page.reducer';
import { GroupState, groupReducer } from './group/group.reducer';
import { OrderState, orderReducer } from './order/order.reducer';
import { PaymentState, paymentReducer } from './payment/payment.reducer';
import { PaymentMethodState, paymentMethodReducer } from './payment-method/payment-method.reducer';
import { RatingState, ratingReducer } from './rating/rating.reducer';
import { SolicitationState, solicitationReducer } from './solicitation/solicitation.reducer';
import { SolicitationCartState, solicitationCartReducer } from './solicitation-cart/solicitation-cart.reducer';
import { UserState, userReducer } from './user/user.reducer';

// Representa o estado global do app:
export interface AppState {
  auth: AuthState;
  activity: ActivityState;
  agent: AgentState;
  auditLog: AuditLogState;
  client: ClientState;
  contentPage: ContentPageState;
  group: GroupState;
  order: OrderState;
  payment: PaymentState;
  paymentMethod: PaymentMethodState;
  rating: RatingState;
  solicitation: SolicitationState;
  solicitationCart: SolicitationCartState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  activity: activityReducer,
  agent: agentReducer,
  auditLog: auditLogReducer,
  client: clientReducer,
  contentPage: contentPageReducer,
  group: groupReducer,
  order: orderReducer,
  payment: paymentReducer,
  paymentMethod: paymentMethodReducer,
  rating: ratingReducer,
  solicitation: solicitationReducer,
  solicitationCart: solicitationCartReducer,
  user: userReducer
};
