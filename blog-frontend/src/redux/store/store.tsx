import { configureStore } from '@reduxjs/toolkit';
import users from '../api/authSlice';
import userData from '../features/userData';
import login from '../api/authSlice'
import signUpData from '../features/signUpData';
import commonData from '../features/commonData/commonData';

export const store = configureStore({
  reducer: {
    users,
    tasks: userData,
    login,
    signUp: signUpData,
    commonData: commonData
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
