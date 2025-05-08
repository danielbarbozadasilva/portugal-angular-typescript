import { Routes } from '@angular/router';
import { AuthGuard } from '@app/core/authentication/auth.guard';

export const userRoutes: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile-client/profile-client.component').then((m) => m.ProfileClientComponent),
    canActivate: [AuthGuard],
    title: 'routeTitles.myProfile',
  },
  {
    path: 'profile/edit',
    loadComponent: () => import('./profile/profile-agent/profile-agent.component').then((m) => m.ProfileAgentComponent),
    canActivate: [AuthGuard],
    title: 'routeTitles.editProfile',
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./profile/purchase-history/purchase-history.component').then((m) => m.PurchaseHistoryComponent),
    canActivate: [AuthGuard],
    title: 'routeTitles.purchaseHistory',
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then((m) => m.SolicitationCartComponent),
    canActivate: [AuthGuard],
    title: 'routeTitles.cart',
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.component').then((m) => m.CheckoutComponent),
    canActivate: [AuthGuard],
    title: 'routeTitles.checkout',
  },
  {
    path: 'order-confirmation',
    loadComponent: () =>
      import('./order-confirmation/order-confirmation.component').then((m) => m.OrderConfirmationComponent),
    canActivate: [AuthGuard],
    title: 'routeTitles.orderConfirmation',
  },
  {
    path: 'activity/:id',
    loadComponent: () => import('./activity-detail/activity-detail.component').then((m) => m.ActivityDetailComponent),
    title: 'routeTitles.activityDetails',
  },
  {
    path: 'comments',
    loadComponent: () => import('./comments/comments.component').then((m) => m.CommentsComponent),
    canActivate: [AuthGuard],
    title: 'routeTitles.comments',
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component').then((m) => m.ChatComponent),
    canActivate: [AuthGuard],
    title: 'routeTitles.chat',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home-page.page').then((m) => m.HomePage),
    title: 'routeTitles.home',
  },
  {
    path: 'recovery-password',
    loadComponent: () =>
      import('./recovery-password/recovery-password.component').then((m) => m.RecoveryPasswordComponent),
    title: 'routeTitles.recoverPassword',
  },
];
