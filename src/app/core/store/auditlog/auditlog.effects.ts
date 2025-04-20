import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuditLogService } from '../../../core/http/audit-log.service';
import * as AuditLogActions from './auditlog.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class AuditLogEffects {
  constructor(
    private actions$: Actions,
    private auditLogService: AuditLogService
  ) {}

  loadAuditLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuditLogActions.loadAuditLogs),
      mergeMap(() =>
        this.auditLogService.getAllAuditLogs().pipe(
          map(logs => AuditLogActions.loadAuditLogsSuccess({ logs })),
          catchError(error => of(AuditLogActions.loadAuditLogsFailure({ error })))
        )
      )
    )
  );

  loadAuditLogById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuditLogActions.loadAuditLogById),
      mergeMap(({ id }) =>
        this.auditLogService.getAuditLog(id).pipe(
          map(log => AuditLogActions.loadAuditLogByIdSuccess({ log })),
          catchError(error => of(AuditLogActions.loadAuditLogByIdFailure({ error })))
        )
      )
    )
  );
}
