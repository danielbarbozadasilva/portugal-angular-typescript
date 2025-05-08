// Filepath: c:\Users\POPULIS\Desktop\VSCODE\ATIVIDADES-TURISTICAS-PORTUGAL\front-end-atividades-turisticas-portugal-angular-typescript\src\app\core\store\agent\agent.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgentState } from './agent.reducer';

export const selectAgentState = createFeatureSelector<AgentState>('agent'); // Ensure 'agent' matches the key in StoreModule

export const selectAgentLoading = createSelector(
  selectAgentState,
  (state) => state.loading
);

export const selectAgentError = createSelector(
  selectAgentState,
  (state) => state.error
);

export const selectAgentSignupSuccess = createSelector(
  selectAgentState,
  (state) => state.signupSuccess
);

export const selectCurrentAgent = createSelector(
  selectAgentState,
  (state) => state.currentAgent
);
