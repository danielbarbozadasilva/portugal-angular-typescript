// Filepath: c:\Users\POPULIS\Desktop\VSCODE\ATIVIDADES-TURISTICAS-PORTUGAL\front-end-atividades-turisticas-portugal-angular-typescript\src\app\core\store\agent\agent.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AgentActions from './agent.actions';
import { IAgent, IResponseError } from '../../models/models.index'; // Adjust path

export interface AgentState {
  loading: boolean;
  error: IResponseError | string | null;
  currentAgent: IAgent | null; // Optional: Store the newly created agent
  signupSuccess: boolean;
}

const initialState: AgentState = {
  loading: false,
  error: null,
  currentAgent: null,
  signupSuccess: false,
};

export const agentReducer = createReducer(
  initialState,

  on(AgentActions.signUpAgent, (state) => ({
    ...state,
    loading: true,
    error: null,
    signupSuccess: false, // Reset success flag on new attempt
  })),

  on(AgentActions.signUpAgentSuccess, (state, { agent }) => ({
    ...state,
    loading: false,
    currentAgent: agent, // Store the agent data if returned
    error: null,
    signupSuccess: true,
  })),

  on(AgentActions.signUpAgentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    currentAgent: null,
    signupSuccess: false,
  })),

  on(AgentActions.clearAgentError, (state) => ({
    ...state,
    error: null,
  }))
);
