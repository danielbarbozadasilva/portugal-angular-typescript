import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GroupService } from '../../http/group.service';
import { loadGroups, loadGroupsSuccess, loadGroupsFailure } from './group.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class GroupEffects {
  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroups),
      mergeMap(() =>
        this.groupService.getAllGroups().pipe(
          map((groups) => loadGroupsSuccess({ groups })),
          catchError((error) => of(loadGroupsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private groupService: GroupService
  ) {}
}
