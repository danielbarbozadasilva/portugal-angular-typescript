import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PaymentService } from '../../../core/http/payment.service';
import * as PaymentActions from './payment.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class PaymentEffects {
  constructor(
    private actions$: Actions,
    private paymentService: PaymentService
  ) {}

  loadPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.loadPayments),
      mergeMap(() =>
        this.paymentService.getAllPayments().pipe(
          map(payments => PaymentActions.loadPaymentsSuccess({ payments })),
          catchError(error => of(PaymentActions.loadPaymentsFailure({ error })))
        )
      )
    )
  );

  loadPaymentById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.loadPaymentById),
      mergeMap(({ id }) =>
        this.paymentService.getPayment(id).pipe(
          map(payment => PaymentActions.loadPaymentByIdSuccess({ payment })),
          catchError(error => of(PaymentActions.loadPaymentByIdFailure({ error })))
        )
      )
    )
  );

  updatePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.updatePayment),
      mergeMap(({ id, data }) =>
        this.paymentService.updatePayment(id, data).pipe(
          map(() => PaymentActions.updatePaymentSuccess()),
          catchError(error => of(PaymentActions.updatePaymentFailure({ error })))
        )
      )
    )
  );

  removePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.removePayment),
      mergeMap(({ id }) =>
        this.paymentService.deletePayment(id).pipe(
          map(() => PaymentActions.removePaymentSuccess()),
          catchError(error => of(PaymentActions.removePaymentFailure({ error })))
        )
      )
    )
  );
}
