import { createAction, props } from '@ngrx/store';
import { IAgent } from '../../models/models.index';

export const loadAgents = createAction(
  '[Agent] Load Agents'
);

export const loadAgentsSuccess = createAction(
  '[Agent] Load Agents Success',
  props<{ agents: IAgent[] }>()
);

export const loadAgentsFailure = createAction(
  '[Agent] Load Agents Failure',
  props<{ error: any }>()
);

export const loadAgentById = createAction(
  '[Agent] Load Agent By ID',
  props<{ id: string }>()
);

export const loadAgentByIdSuccess = createAction(
  '[Agent] Load Agent By ID Success',
  props<{ agent: IAgent }>()
);

export const loadAgentByIdFailure = createAction(
  '[Agent] Load Agent By ID Failure',
  props<{ error: any }>()
);

export const createAgent = createAction(
  '[Agent] Create Agent',
  props<{ agent: Partial<IAgent> }>()
);

export const createAgentSuccess = createAction(
  '[Agent] Create Agent Success'
);

export const createAgentFailure = createAction(
  '[Agent] Create Agent Failure',
  props<{ error: any }>()
);

export const updateAgent = createAction(
  '[Agent] Update Agent',
  props<{ id: string; data: Partial<IAgent> }>()
);

export const updateAgentSuccess = createAction(
  '[Agent] Update Agent Success'
);

export const updateAgentFailure = createAction(
  '[Agent] Update Agent Failure',
  props<{ error: any }>()
);

export const deleteAgent = createAction(
  '[Agent] Delete Agent',
  props<{ id: string }>()
);

export const deleteAgentSuccess = createAction(
  '[Agent] Delete Agent Success'
);

export const deleteAgentFailure = createAction(
  '[Agent] Delete Agent Failure',
  props<{ error: any }>()
);
