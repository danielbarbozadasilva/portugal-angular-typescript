// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Importar withInterceptorsFromDi
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// Importa as rotas "client-side"
import { routes } from './app.routes';

// Importar reducers e effects
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

// Importar Serviços
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

// Importar Interceptor
import { TokenInterceptor } from './core/authentication/token.interceptor';

/**
 * Configuração do loader para o ngx-translate (igual ao AppModule)
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/languages/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Roteamento padrão
    provideRouter(routes),

    // HTTP client com Interceptor (usando DI para interceptor baseado em classe)
    provideHttpClient(withInterceptorsFromDi()),

    /**
     * Hidratação do lado do cliente (para SSR)
     */
    provideClientHydration(),

    // Configuração NgRx Store
    provideStore(reducers),

    // Configuração NgRx Effects
    provideEffects([
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

    // Configuração ngx-translate (usando importProvidersFrom)
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en-US',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),

    // Prover Interceptor baseado em classe
    TokenInterceptor,

    // Prover Serviços diretamente
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
};
