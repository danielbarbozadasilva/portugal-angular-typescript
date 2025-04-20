import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {PaymentMethodService} from '../../../core/http/payment-method.service';
import * as PaymentMethodActions from './payment-method.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class PaymentMethodEffects {
  constructor(
    private actions$: Actions,
    private paymentMethodService: PaymentMethodService
  ) {}

  loadPaymentMethods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentMethodActions.loadPaymentMethods),
      mergeMap(() =>
        this.paymentMethodService.getAllPaymentMethods().pipe(
          map(methods => PaymentMethodActions.loadPaymentMethodsSuccess({ methods })),
          catchError(error => of(PaymentMethodActions.loadPaymentMethodsFailure({ error })))
        )
      )
    )
  );

  loadPaymentMethodById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentMethodActions.loadPaymentMethodById),
      mergeMap(({ id }) =>
        this.paymentMethodService.getPaymentMethod(id).pipe(
          map(method => PaymentMethodActions.loadPaymentMethodByIdSuccess({ method })),
          catchError(error => of(PaymentMethodActions.loadPaymentMethodByIdFailure({ error })))
        )
      )
    )
  );

  updatePaymentMethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentMethodActions.updatePaymentMethod),
      mergeMap(({ id, data }) =>
        this.paymentMethodService.updatePaymentMethod(id, data).pipe(
          map(() => PaymentMethodActions.updatePaymentMethodSuccess()),
          catchError(error => of(PaymentMethodActions.updatePaymentMethodFailure({ error })))
        )
      )
    )
  );

  removePaymentMethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentMethodActions.removePaymentMethod),
      mergeMap(({ id }) =>
        this.paymentMethodService.deletePaymentMethod(id).pipe(
          map(() => PaymentMethodActions.removePaymentMethodSuccess()),
          catchError(error => of(PaymentMethodActions.removePaymentMethodFailure({ error })))
        )
      )
    )
  );
}
