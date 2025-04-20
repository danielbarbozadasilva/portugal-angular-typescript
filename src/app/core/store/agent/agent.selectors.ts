import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgentState } from './agent.reducer';

export const selectAgentState = createFeatureSelector<AgentState>('agent');

export const selectAgentLoading = createSelector(
  selectAgentState,
  (state) => state.loading
);

export const selectAllAgents = createSelector(
  selectAgentState,
  (state) => state.all
);

export const selectSelectedAgent = createSelector(
  selectAgentState,
  (state) => state.selected
);

export const selectAgentError = createSelector(
  selectAgentState,
  (state) => state.error
);
