import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Importar todos os reducers
import { reducers } from './reducers-map';

// Importar todos os efeitos
import { AuthEffects } from './auth/auth.effects';
import { ActivityEffects } from './activity/activity.effects';
import { AgentEffects } from './agent/agent.effects';
import { AuditLogEffects } from './auditlog/auditlog.effects';
import { ClientEffects } from './client/client.effects';
import { ContentPageEffects } from './content-page/content-page.effects';
import { GroupEffects } from './group/group.effects';
import { OrderEffects } from './order/order.effects';
import { PaymentEffects } from './payment/payment.effects';
import { PaymentMethodEffects } from './payment-method/payment-method.effects';
import { RatingEffects } from './rating/rating.effects';
import { SolicitationEffects } from './solicitation/solicitation.effects';
import { SolicitationCartEffects } from './solicitation-cart/solicitation-cart.effects';
import { UserEffects } from './user/user.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('appState', reducers),
    EffectsModule.forFeature([
      AuthEffects,
      ActivityEffects,
      AgentEffects,
      AuditLogEffects,
      ClientEffects,
      ContentPageEffects,
      GroupEffects,
      OrderEffects,
      PaymentEffects,
      PaymentMethodEffects,
      RatingEffects,
      SolicitationEffects,
      SolicitationCartEffects,
      UserEffects
    ])
  ],
  exports: []
})
export class AppStoreModule {}
