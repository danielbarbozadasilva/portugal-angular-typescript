import { createReducer, on } from '@ngrx/store';
import * as ActivityActions from './activity.actions';
import { IActivity } from '../../models/activity.model';

export interface ActivityState {
  loading: boolean;
  all: IActivity[];
  selected?: IActivity;
  error?: string;
}

const initialState: ActivityState = {
  loading: false,
  all: [],
  selected: undefined,
  error: undefined
};

export const activityReducer = createReducer(
  initialState,

  on(ActivityActions.loadActivities, (state) => ({
    ...state,
    loading: true,
    error: undefined
  })),
  on(ActivityActions.loadActivitiesSuccess, (state, { activities }) => ({
    ...state,
    loading: false,
    all: activities
  })),
  on(ActivityActions.loadActivitiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(ActivityActions.loadActivityById, (state) => ({
    ...state,
    loading: true
  })),
  on(ActivityActions.loadActivityByIdSuccess, (state, { activity }) => ({
    ...state,
    loading: false,
    selected: activity
  })),
  on(ActivityActions.loadActivityByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(ActivityActions.createActivity, (state) => ({
    ...state,
    loading: true
  })),
  on(ActivityActions.createActivitySuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(ActivityActions.createActivityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(ActivityActions.updateActivity, (state) => ({
    ...state,
    loading: true
  })),
  on(ActivityActions.updateActivitySuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(ActivityActions.updateActivityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(ActivityActions.deleteActivity, (state) => ({
    ...state,
    loading: true
  })),
  on(ActivityActions.deleteActivitySuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(ActivityActions.deleteActivityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
