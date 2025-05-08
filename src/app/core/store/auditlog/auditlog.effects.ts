import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuditLogService } from '../../http/audit-log.service'; // Correct path
import * as AuditLogActions from './auditlog.actions';
import { IResponseError } from '../../models/models.index';

@Injectable()
export class AuditLogEffects {
  constructor(
    private actions$: Actions,
    private auditLogService: AuditLogService
  ) {}

  loadAllAuditLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuditLogActions.loadAllAuditLogs),
      mergeMap(() =>
        this.auditLogService.getAllAuditLogs().pipe(
          map((logs) => AuditLogActions.loadAllAuditLogsSuccess({ logs })),
          catchError((error: IResponseError) => of(AuditLogActions.loadAllAuditLogsFailure({ error })))
        )
      )
    )
  );

  loadAuditLogById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuditLogActions.loadAuditLogById),
      switchMap((action) =>
        this.auditLogService.getAuditLog(action.id).pipe(
          map((log) => AuditLogActions.loadAuditLogByIdSuccess({ log })),
          catchError((error: IResponseError) => of(AuditLogActions.loadAuditLogByIdFailure({ error })))
        )
      )
    )
  );

  // Add create effect if create action/service method exists
  // createAuditLog$ = createEffect(() => ... );
}
