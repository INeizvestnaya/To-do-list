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
    }
  }
});

export const { updateTasks, selectDay, selectTask } = TasksSlice.actions;

export default TasksSlice.reducer;
