import { NgModule, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

/* NgRx Store + Effects */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/* ngx-translate */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/* Reducers e Effects do seu projeto */
import { reducers } from './core/store/reducers-map';
import { AuthEffects } from './core/store/auth/auth.effects';
import { ActivityEffects } from './core/store/activity/activity.effects';
import { AgentEffects } from './core/store/agent/agent.effects';
import { AuditLogEffects } from './core/store/auditlog/auditlog.effects';
import { ClientEffects } from './core/store/client/client.effects';
import { ContentPageEffects } from './core/store/content-page/content-page.effects';
import { GroupEffects } from './core/store/group/group.effects';
import { OrderEffects } from './core/store/order/order.effects';
import { PaymentEffects } from './core/store/payment/payment.effects';
import { PaymentMethodEffects } from './core/store/payment-method/payment-method.effects';
import { RatingEffects } from './core/store/rating/rating.effects';
import { SolicitationEffects } from './core/store/solicitation/solicitation.effects';
import { SolicitationCartEffects } from './core/store/solicitation-cart/solicitation-cart.effects';
import { UserEffects } from './core/store/user/user.effects';

/* Services */
import {
  ActivityService,
  AgentService,
  AuditLogService,
  AuthService,
  ClientService,
  GroupService,
  OrderService,
  PaymentMethodService,
  PaymentService,
  RatingService,
  SolicitationCartService,
  SolicitationService,
  UserService,
} from './core/http/index';
import { SignUpClientComponent } from './pages/signup-client/signup-client-component';

/**
 * Configuração do loader para o ngx-translate
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/languages/', '.json');
}

/**
 * AppModule funciona como local para configurar NgRx, Translate, etc.
 * Não declaramos componentes aqui porque estamos usando standalone.
 */
@NgModule({
  declarations: [
    SignUpClientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    /* NgRx */
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
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
      UserEffects,
    ]),

    /* ngx-translate */
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    ActivityService,
    AgentService,
    AuditLogService,
    AuthService,
    ClientService,
    GroupService,
    OrderService,
    UserService,
    SolicitationService,
    PaymentMethodService,
    PaymentService,
    RatingService,
    SolicitationCartService,
  ],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap() {
    // Deixamos vazio porque o bootstrap é feito em main.ts com bootstrapApplication
  }
}
