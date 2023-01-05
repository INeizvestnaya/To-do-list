import { createSlice } from '@reduxjs/toolkit';

import { auth } from '../firebase-config';

const initialState = {
  tasks: {},
  selectedDay: new Date().toLocaleDateString(),
  selectedTask: null,
  user: auth.currentUser?.uid
};

const TasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTasks: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.tasks = action.payload.tasks;
    },
    selectDay: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedDay = action.payload.day;
    },
    selectTask: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedTask = action.payload.task;
    },
    setUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    }
  }
});

export const { updateTasks, selectDay, selectTask, setUser } =
  TasksSlice.actions;

export default TasksSlice.reducer;
