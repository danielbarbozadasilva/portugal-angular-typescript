import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuditLogState } from './auditlog.reducer'

export const selectAuditLogState = createFeatureSelector<AuditLogState>('auditLog');

export const selectAuditLogLoading = createSelector(
  selectAuditLogState,
  (state) => state.loading
);

export const selectAllAuditLogs = createSelector(
  selectAuditLogState,
  (state) => state.all
);

export const selectSelectedAuditLog = createSelector(
  selectAuditLogState,
  (state) => state.selected
);

export const selectAuditLogError = createSelector(
  selectAuditLogState,
  (state) => state.error
);
