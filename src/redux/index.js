import { configureStore } from '@reduxjs/toolkit';

import TasksReducer from './TasksSlice';
import UserReducer from './UserSlice';

const store = configureStore({
  reducer: { tasks: TasksReducer, user: UserReducer }
});

export default store;
