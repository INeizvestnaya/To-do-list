import { createSelector } from '@reduxjs/toolkit';

const selectState = (state) => state;

export const selectUser = createSelector(
  selectState,
  ({ user: { user } }) => user
);

export const selectAllTasks = createSelector(
  selectState,
  ({ tasks: { tasks } }) => tasks
);

export const selectDay = createSelector(
  selectState,
  ({ tasks: { selectedDay } }) => selectedDay
);

export const selectTask = createSelector(
  selectState,
  ({ tasks: { selectedTask } }) => selectedTask
);
