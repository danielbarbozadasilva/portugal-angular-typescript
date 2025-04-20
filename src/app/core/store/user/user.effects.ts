import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/http/user.service';
import * as UserActions from './user.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAllUsers),
      mergeMap(() =>
        this.userService.getAllUsers().pipe(
          map(users => UserActions.loadAllUsersSuccess({ users })),
          catchError(error => of(UserActions.loadAllUsersFailure({ error })))
        )
      )
    )
  );

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserById),
      mergeMap(({ id }) =>
        this.userService.getUser(id).pipe(
          map(user => UserActions.loadUserByIdSuccess({ user })),
          catchError(error => of(UserActions.loadUserByIdFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ id, data }) =>
        this.userService.updateUser(id, data).pipe(
          map(() => UserActions.updateUserSuccess()),
          catchError(error => of(UserActions.updateUserFailure({ error })))
        )
      )
    )
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.removeUser),
      mergeMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => UserActions.removeUserSuccess()),
          catchError(error => of(UserActions.removeUserFailure({ error })))
        )
      )
    )
  );
}
