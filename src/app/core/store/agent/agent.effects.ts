import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AgentService } from '../../../core/http/agent.service';
import * as AgentActions from './agent.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

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
          map(agents => AgentActions.loadAgentsSuccess({ agents })),
          catchError(error => of(AgentActions.loadAgentsFailure({ error })))
        )
      )
    )
  );

  loadAgentById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentActions.loadAgentById),
      mergeMap(({ id }) =>
        this.agentService.getAgent(id).pipe(
          map(agent => AgentActions.loadAgentByIdSuccess({ agent })),
          catchError(error => of(AgentActions.loadAgentByIdFailure({ error })))
        )
      )
    )
  );

  createAgent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentActions.createAgent),
      mergeMap(({ agent }) =>
        this.agentService.createAgent(agent).pipe(
          map(() => AgentActions.createAgentSuccess()),
          catchError(error => of(AgentActions.createAgentFailure({ error })))
        )
      )
    )
  );

  updateAgent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentActions.updateAgent),
      mergeMap(({ id, data }) =>
        this.agentService.updateAgent(id, data).pipe(
          map(() => AgentActions.updateAgentSuccess()),
          catchError(error => of(AgentActions.updateAgentFailure({ error })))
        )
      )
    )
  );

  deleteAgent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentActions.deleteAgent),
      mergeMap(({ id }) =>
        this.agentService.deleteAgent(id).pipe(
          map(() => AgentActions.deleteAgentSuccess()),
          catchError(error => of(AgentActions.deleteAgentFailure({ error })))
        )
      )
    )
  );
}
