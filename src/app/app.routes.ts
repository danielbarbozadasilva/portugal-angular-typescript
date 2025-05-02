import { Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/auth.guard';
import { RoleGuard } from './core/authentication/role.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home-page.component';
import { AboutUsComponent } from './pages/about/about-us.component';
import { SignInComponent } from './pages/signIn/signin.component';
import { SignUpClientComponent } from './pages/signup-client/signup-client-component';
import { SignupAgentComponent } from './pages/signup-agent/signup-agent-component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full', title: 'routeTitles.home' },
      { path: 'about', component: AboutUsComponent, title: 'Sobre Nós' },
      {
        path: 'activity/:id',
        loadComponent: () =>
          import('./pages/activity-detail/activity-detail.component').then((m) => m.ActivityDetailComponent),
        title: 'routeTitles.activityDetails',
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then((m) => m.SolicitationCartComponent),
        canActivate: [AuthGuard],
        title: 'routeTitles.cart',
      },
      {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
        canActivate: [AuthGuard],
        title: 'routeTitles.checkout',
      },
      {
        path: 'order-confirmation',
        loadComponent: () =>
          import('./pages/order-confirmation/order-confirmation.component').then((m) => m.OrderConfirmationComponent),
        canActivate: [AuthGuard],
        title: 'routeTitles.orderConfirmation',
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'client',
            loadComponent: () =>
              import('./pages/profile/profile-client/profile-client.component').then((m) => m.ProfileClientComponent),
            title: 'routeTitles.myProfile',
          },
          {
            path: 'history',
            loadComponent: () =>
              import('./pages/profile/purchase-history/purchase-history.component').then(
                (m) => m.PurchaseHistoryComponent
              ),
            title: 'routeTitles.purchaseHistory',
          },
          {
            path: 'agent/edit',
            loadComponent: () =>
              import('./pages/profile/profile-agent/profile-agent.component').then((m) => m.ProfileAgentComponent),
            title: 'routeTitles.editAgentProfile',
          },
        ],
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./pages/change-password/change-password.component').then((m) => m.ChangePasswordPageComponent),
        canActivate: [AuthGuard],
        title: 'routeTitles.changePassword',
      },
      { path: 'signin', component: SignInComponent, title: 'Login' },
      { path: 'signup-client', component: SignUpClientComponent, title: 'Cadastro Cliente' },
      { path: 'signup-agent', component: SignupAgentComponent, title: 'Cadastro Agente' },
      { path: 'recovery-password', component: RecoveryPasswordComponent, title: 'routeTitles.recoverPassword' },
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'consultant'] },
        title: 'routeTitles.adminArea',
      },
      {
        path: 'travel-buddy',
        loadChildren: () => import('./travel-buddy/travel-buddy.routes').then((m) => m.travelBuddyRoutes),
        canActivate: [AuthGuard],
        title: 'Travel Buddy',
      },
      {
        path: 'solicitation-cart',
        loadComponent: () =>
          import('./pages/solicitation-cart/solicitation-cart.component').then((m) => m.SolicitationCartComponent),
        title: 'Solicitações',
      },
      { path: 'forbidden', component: ForbiddenComponent, title: 'Acesso Negado' },
      { path: '**', component: NotFoundComponent, title: 'Página Não Encontrada' },
    ],
  },
];
