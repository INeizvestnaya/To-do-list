/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {},
  selectedDay: new Date().toLocaleDateString(),
  selectedTask: null
};

const TasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    setDay: (state, action) => {
      state.selectedDay = action.payload.day;
    },
    setTask: (state, action) => {
      state.selectedTask = action.payload.task;
    }
  }
});

export const { updateTasks, setDay, setTask } = TasksSlice.actions;

export default TasksSlice.reducer;
