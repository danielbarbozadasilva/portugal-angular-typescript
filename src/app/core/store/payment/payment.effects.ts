import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PaymentService } from '../../../core/http/payment.service';
import * as PaymentActions from './payment.actions';
import { IResponseError, IPayment } from '../../../core/models/models.index';

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
          map((payments) => PaymentActions.loadPaymentsSuccess({ payments })),
          catchError((error: IResponseError) => of(PaymentActions.loadPaymentsFailure({ error })))
        )
      )
    )
  );

  loadPaymentById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.loadPaymentById),
      switchMap((action) =>
        this.paymentService.getPaymentById(action.id).pipe(
          map((payment: IPayment) => PaymentActions.loadPaymentByIdSuccess({ payment })),
          catchError((error: IResponseError) => of(PaymentActions.loadPaymentByIdFailure({ error })))
        )
      )
    )
  );

  createPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.createPayment),
      mergeMap((action) =>
        this.paymentService.createPayment(action.data).pipe(
          map((payment: IPayment) => PaymentActions.createPaymentSuccess({ payment })),
          catchError((error: IResponseError) => of(PaymentActions.createPaymentFailure({ error })))
        )
      )
    )
  );

  updatePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.updatePayment),
      mergeMap((action) =>
        this.paymentService.updatePayment(action.id, action.data).pipe(
          map((payment: IPayment) => PaymentActions.updatePaymentSuccess({ payment })),
          catchError((error: IResponseError) => of(PaymentActions.updatePaymentFailure({ error })))
        )
      )
    )
  );

  removePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.removePayment),
      mergeMap((action) =>
        this.paymentService.deletePayment(action.id).pipe(
          map(({ id }) => PaymentActions.removePaymentSuccess({ id })),
          catchError((error: IResponseError) => of(PaymentActions.removePaymentFailure({ error })))
        )
      )
    )
  );
}
