/* src/app/app.config.ts */

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';

/* Rotas do app */
import { appRoutes } from './app.routes';

/* NgRx - Store e Effects */
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
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

/* Serviços (injeção direta de classes) */
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
} from './core/http';

/* Interceptor de Autenticação */
import { TokenInterceptor } from './core/authentication/token.interceptor';

/* i18n (ngx-translate) */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Função 'factory' para ngx-translate,
 * carregando arquivos de idioma em ../assets/languages/*.json
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/languages/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Roteamento no cliente, com SSR + pré-carregamento.
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withPreloading(PreloadAllModules)
    ),

    // HTTP client + Interceptores via DI
    provideHttpClient(withInterceptorsFromDi()),

    // Hidratação do lado do cliente (para SSR)
    provideClientHydration(),

    // NgRx: Store + Effects
    provideStore(reducers),
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

    // ngx-translate (forRoot) via importProvidersFrom
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

    // Registro do interceptor no chain de HTTP_INTERCEPTORS
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },

    // Demais serviços (injeção direta)
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
  ],
};
