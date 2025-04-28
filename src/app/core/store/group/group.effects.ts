import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { GroupService } from '../../http/group.service'; // Correct path
import * as GroupActions from './group.actions';
import { IResponseError } from '../../models/models.index';

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
          map((groups) => GroupActions.loadGroupsSuccess({ groups })),
          catchError((error: IResponseError) => of(GroupActions.loadGroupsFailure({ error })))
        )
      )
    )
  );

  loadGroupById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.loadGroupById),
      switchMap((action) =>
        this.groupService.getGroup(action.id).pipe(
          map((group) => GroupActions.loadGroupByIdSuccess({ group })),
          catchError((error: IResponseError) => of(GroupActions.loadGroupByIdFailure({ error })))
        )
      )
    )
  );

  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.updateGroup),
      mergeMap((action) =>
        this.groupService.updateGroup(action.id, action.data).pipe(
          // Assuming success action doesn't need the updated group
          map(() => GroupActions.updateGroupSuccess()),
          catchError((error: IResponseError) => of(GroupActions.updateGroupFailure({ error })))
        )
      )
    )
  );

  removeGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.removeGroup),
      mergeMap((action) =>
        this.groupService.deleteGroup(action.id).pipe(
          // Assuming success action doesn't need the id
          map(() => GroupActions.removeGroupSuccess()),
          catchError((error: IResponseError) => of(GroupActions.removeGroupFailure({ error })))
        )
      )
    )
  );

  // Add create effect if create action/service method exists
  // createGroup$ = createEffect(() => ... );
}
