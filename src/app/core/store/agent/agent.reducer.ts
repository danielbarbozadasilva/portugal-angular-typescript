import { createReducer, on } from '@ngrx/store';
import * as AgentActions from './agent.actions';
import { IAgent } from '../../models/models.index';

export interface AgentState {
  loading: boolean;
  all: IAgent[];
  selected?: IAgent;
  error?: string;
}

const initialState: AgentState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const agentReducer = createReducer(
  initialState,

  // Load Agents
  on(AgentActions.loadAgents, (state) => ({
    ...state,
    loading: true,
    error: undefined
  })),
  on(AgentActions.loadAgentsSuccess, (state, { agents }) => ({
    ...state,
    loading: false,
    all: agents
  })),
  on(AgentActions.loadAgentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Agent by ID
  on(AgentActions.loadAgentById, (state) => ({
    ...state,
    loading: true
  })),
  on(AgentActions.loadAgentByIdSuccess, (state, { agent }) => ({
    ...state,
    loading: false,
    selected: agent
  })),
  on(AgentActions.loadAgentByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Agent
  on(AgentActions.createAgent, (state) => ({
    ...state,
    loading: true
  })),
  on(AgentActions.createAgentSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(AgentActions.createAgentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Agent
  on(AgentActions.updateAgent, (state) => ({
    ...state,
    loading: true
  })),
  on(AgentActions.updateAgentSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(AgentActions.updateAgentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Agent
  on(AgentActions.deleteAgent, (state) => ({
    ...state,
    loading: true
  })),
  on(AgentActions.deleteAgentSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(AgentActions.deleteAgentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
