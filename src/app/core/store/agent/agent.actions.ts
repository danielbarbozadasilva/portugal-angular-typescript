// Filepath: c:\Users\POPULIS\Desktop\VSCODE\ATIVIDADES-TURISTICAS-PORTUGAL\front-end-atividades-turisticas-portugal-angular-typescript\src\app\core\store\agent\agent.actions.ts
import { createAction, props } from '@ngrx/store';
import { IAgent, IAgentData } from '../../models/models.agent';
import { IResponseError } from '../../models/models.index';

export const signUpAgent = createAction('[Agent Signup] Sign Up Agent', props<{ agentData: IAgentData }>());

export const signUpAgentSuccess = createAction(
  '[Agent Signup] Sign Up Agent Success',
  props<{ agent: IAgent }>() // Or props<{ message: string }>() if API returns only success message
);

export const signUpAgentFailure = createAction(
  '[Agent Signup] Sign Up Agent Failure',
  props<{ error: IResponseError | string }>()
);

export const clearAgentError = createAction('[Agent Signup] Clear Agent Error');
