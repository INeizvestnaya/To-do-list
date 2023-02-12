import { createSlice } from '@reduxjs/toolkit';

import { auth } from '../firebase-config';

const initialState = { user: auth.currentUser?.uid || null };

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload.user;
    }
  }
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
