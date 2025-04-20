import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GroupService } from '../../../core/http/group.service';
import * as GroupActions from './group.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private groupService: GroupService
  ) {}

  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.loadGroups),
      mergeMap(() =>
        this.groupService.getAllGroups().pipe(
          map(groups => GroupActions.loadGroupsSuccess({ groups })),
          catchError(error => of(GroupActions.loadGroupsFailure({ error })))
        )
      )
    )
  );

  loadGroupById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.loadGroupById),
      mergeMap(({ id }) =>
        this.groupService.getGroup(id).pipe(
          map(group => GroupActions.loadGroupByIdSuccess({ group })),
          catchError(error => of(GroupActions.loadGroupByIdFailure({ error })))
        )
      )
    )
  );

  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.updateGroup),
      mergeMap(({ id, data }) =>
        this.groupService.updateGroup(id, data).pipe(
          map(() => GroupActions.updateGroupSuccess()),
          catchError(error => of(GroupActions.updateGroupFailure({ error })))
        )
      )
    )
  );

  removeGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.removeGroup),
      mergeMap(({ id }) =>
        this.groupService.deleteGroup(id).pipe(
          map(() => GroupActions.removeGroupSuccess()),
          catchError(error => of(GroupActions.removeGroupFailure({ error })))
        )
      )
    )
  );
}
