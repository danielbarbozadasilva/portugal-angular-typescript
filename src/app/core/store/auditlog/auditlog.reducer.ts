import { createReducer, on } from '@ngrx/store';
import * as AuditLogActions from './auditlog.actions';
import { IAuditLog, IResponseError } from '../../models/models.index'; // Import IResponseError

export interface AuditLogState {
  loading: boolean;
  all: IAuditLog[];
  selected?: IAuditLog;
  error?: IResponseError | string; // Allow IResponseError or string for error
}

const initialState: AuditLogState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined,
};

export const auditLogReducer = createReducer(
  initialState,

  // Load All Audit Logs
  on(AuditLogActions.loadAllAuditLogs, (state) => ({
    // Corrected action name
    ...state,
    loading: true,
    error: undefined,
  })),
  on(AuditLogActions.loadAllAuditLogsSuccess, (state, { logs }) => ({
    // Corrected action name
    ...state,
    loading: false,
    all: logs,
  })),
  on(AuditLogActions.loadAllAuditLogsFailure, (state, { error }) => ({
    // Corrected action name
    ...state,
    loading: false,
    error: error.message || 'Failed to load audit logs', // Store error message or the object
  })),

  // Load Audit Log by ID
  on(AuditLogActions.loadAuditLogById, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuditLogActions.loadAuditLogByIdSuccess, (state, { log }) => ({
    ...state,
    loading: false,
    selected: log,
  })),
  on(AuditLogActions.loadAuditLogByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message || 'Failed to load audit log by ID', // Store error message or the object
  }))
);
