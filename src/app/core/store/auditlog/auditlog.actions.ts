import { createAction, props } from '@ngrx/store';
import { IAuditLog, IResponseError } from '../../models/models.index';

// Load All Audit Logs
export const loadAllAuditLogs = createAction('[AuditLog] Load All');
export const loadAllAuditLogsSuccess = createAction('[AuditLog] Load All Success', props<{ logs: IAuditLog[] }>());
export const loadAllAuditLogsFailure = createAction('[AuditLog] Load All Failure', props<{ error: IResponseError }>());

// Load Audit Log By ID
export const loadAuditLogById = createAction('[AuditLog] Load By ID', props<{ id: string }>());
export const loadAuditLogByIdSuccess = createAction('[AuditLog] Load By ID Success', props<{ log: IAuditLog }>());
export const loadAuditLogByIdFailure = createAction(
  '[AuditLog] Load By ID Failure',
  props<{ error: IResponseError }>()
);

// Add other actions if needed (e.g., create, filter)
