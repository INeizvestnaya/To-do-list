import { configureStore } from '@reduxjs/toolkit';

import TasksReducer from './TasksSlice';

const store = configureStore({
  reducer: { tasks: TasksReducer }
});

export default store;
