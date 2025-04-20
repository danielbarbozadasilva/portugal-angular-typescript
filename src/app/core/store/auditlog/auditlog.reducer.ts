import { createReducer, on } from '@ngrx/store';
import * as AuditLogActions from './auditlog.actions';
import { IAuditLog } from '../../models/models.index';

export interface AuditLogState {
  loading: boolean;
  all: IAuditLog[];
  selected?: IAuditLog;
  error?: string;
}

const initialState: AuditLogState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const auditLogReducer = createReducer(
  initialState,

  on(AuditLogActions.loadAuditLogs, (state) => ({
    ...state,
    loading: true,
    error: undefined
  })),
  on(AuditLogActions.loadAuditLogsSuccess, (state, { logs }) => ({
    ...state,
    loading: false,
    all: logs
  })),
  on(AuditLogActions.loadAuditLogsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AuditLogActions.loadAuditLogById, (state) => ({
    ...state,
    loading: true
  })),
  on(AuditLogActions.loadAuditLogByIdSuccess, (state, { log }) => ({
    ...state,
    loading: false,
    selected: log
  })),
  on(AuditLogActions.loadAuditLogByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
