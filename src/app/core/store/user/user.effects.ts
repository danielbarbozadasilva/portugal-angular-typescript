import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserService } from '../../http/user.service'; // Correct path
import * as UserActions from './user.actions';
import { IResponseError } from '../../models/models.index';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  // Effect to load all users
  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAllUsers),
      mergeMap(() =>
        // Use mergeMap for parallel requests if needed, switchMap cancels previous
        this.userService.getAllUsers().pipe(
          map((users) => UserActions.loadAllUsersSuccess({ users })),
          catchError((error: IResponseError) => of(UserActions.loadAllUsersFailure({ error })))
        )
      )
    )
  );

  // Effect to load a single user by ID
  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserById),
      switchMap(
        (
          action // Use switchMap as only the latest request for a specific ID matters
        ) =>
          this.userService.getUserById(action.id).pipe(
            map((user) => UserActions.loadUserByIdSuccess({ user })),
            catchError((error: IResponseError) => of(UserActions.loadUserByIdFailure({ error })))
          )
      )
    )
  );

  // Effect to update a user
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap((action) =>
        this.userService.updateUser(action.id, action.data).pipe(
          // Optionally dispatch success action or trigger another action like reload
          map(() => UserActions.updateUserSuccess()), // Simple success action
          // Consider dispatching loadUserByIdSuccess({ user }) if API returns updated user
          catchError((error: IResponseError) => of(UserActions.updateUserFailure({ error })))
        )
      )
    )
  );

  // Effect to remove a user
  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.removeUser),
      mergeMap((action) =>
        this.userService.removeUser(action.id).pipe(
          map(({ id: _id }) => UserActions.removeUserSuccess()), // Prefix unused variable
          // Optionally trigger loadAllUsers again after successful removal
          catchError((error: IResponseError) => of(UserActions.removeUserFailure({ error })))
        )
      )
    )
  );

  // You might want an effect that reloads all users after a successful update or remove
  // Example:
  // reloadUsersAfterModification$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.updateUserSuccess, UserActions.removeUserSuccess),
  //     map(() => UserActions.loadAllUsers()) // Dispatch loadAllUsers action
  //   )
  // );
}
