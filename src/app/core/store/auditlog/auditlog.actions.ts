import { createAction, props } from '@ngrx/store';
import { IAuditLog } from '../../models/models.index';

export const loadAuditLogs = createAction(
  '[AuditLog] Load AuditLogs'
);

export const loadAuditLogsSuccess = createAction(
  '[AuditLog] Load AuditLogs Success',
  props<{ logs: IAuditLog[] }>()
);

export const loadAuditLogsFailure = createAction(
  '[AuditLog] Load AuditLogs Failure',
  props<{ error: any }>()
);

export const loadAuditLogById = createAction(
  '[AuditLog] Load AuditLog By ID',
  props<{ id: string }>()
);

export const loadAuditLogByIdSuccess = createAction(
  '[AuditLog] Load AuditLog By ID Success',
  props<{ log: IAuditLog }>()
);

export const loadAuditLogByIdFailure = createAction(
  '[AuditLog] Load AuditLog By ID Failure',
  props<{ error: any }>()
);
