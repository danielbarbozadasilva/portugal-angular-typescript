import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AgentService } from '../../http/agent.service';
import * as AgentActions from './agent.actions';
import { IResponseError } from '../../models/models.index';
import { Router } from '@angular/router'; 
@Injectable()
export class AgentEffects {
  constructor(
    private actions$: Actions,
    private agentService: AgentService,
    private router: Router
  ) {}

  signUpAgent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentActions.signUpAgent),
      mergeMap((action) =>
        this.agentService.createAgent(action.agentData).pipe(
          map((response) => {
             return AgentActions.signUpAgentSuccess({ agent: response });
          }),
          catchError((error: IResponseError) => {
            const errorMsg = error?.message || 'Erro desconhecido no cadastro.';
            return of(AgentActions.signUpAgentFailure({ error: errorMsg }));
          })
        )
      )
    )
  );

  // Optional: Redirect on successful signup
  signUpAgentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgentActions.signUpAgentSuccess),
      tap(() => {
        // Navigate to login page or a confirmation page after successful signup
        this.router.navigate(['/signIn']); // Adjust target route
        // Optionally show a success notification/toast here
      })
    ),
    { dispatch: false } // No further action dispatched from this effect
  );

}
