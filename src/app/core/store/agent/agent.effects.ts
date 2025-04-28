import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AgentService } from '../../http/agent.service'; // Correct path
import * as AgentActions from './agent.actions';
import { IResponseError } from '../../models/models.index';

@Injectable()
export class AgentEffects {
  constructor(
    private actions$: Actions,
    private agentService: AgentService
  ) {}

  loadAgents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentActions.loadAgents),
      mergeMap(() =>
        this.agentService.getAllAgents().pipe(
          map((agents) => AgentActions.loadAgentsSuccess({ agents })),
          catchError((error: IResponseError) => of(AgentActions.loadAgentsFailure({ error })))
        )
      )
    )
  );

  loadAgentById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentActions.loadAgentById),
      switchMap((action) =>
        this.agentService.getAgent(action.id).pipe(
          map((agent) => AgentActions.loadAgentByIdSuccess({ agent })),
          catchError((error: IResponseError) => of(AgentActions.loadAgentByIdFailure({ error })))
        )
      )
    )
  );

  createAgent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentActions.createAgent),
      mergeMap((action) =>
        this.agentService.createAgent(action.agent as any).pipe(
          // Assuming success action doesn't need the created agent
          map(() => AgentActions.createAgentSuccess()),
          catchError((error: IResponseError) => of(AgentActions.createAgentFailure({ error })))
        )
      )
    )
  );

  updateAgent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentActions.updateAgent),
      mergeMap((action) =>
        this.agentService.updateAgent(action.id, action.data).pipe(
          // Assuming success action doesn't need the updated agent
          map(() => AgentActions.updateAgentSuccess()),
          catchError((error: IResponseError) => of(AgentActions.updateAgentFailure({ error })))
        )
      )
    )
  );

  deleteAgent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentActions.deleteAgent),
      mergeMap((action) =>
        this.agentService.deleteAgent(action.id).pipe(
          // Assuming success action doesn't need the id
          map(() => AgentActions.deleteAgentSuccess()),
          catchError((error: IResponseError) => of(AgentActions.deleteAgentFailure({ error })))
        )
      )
    )
  );
}
