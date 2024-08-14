import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@/api/generated/githubApi';
import { querySlice } from './querySlice';

/** The global app store */
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    querySlice: querySlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});

/** Root state of the global store */
export type RootState = ReturnType<typeof store.getState>;
/** Dispatch type of the global store */
export type AppDispatch = typeof store.dispatch;

/** A hook to access the global store's state */
export const useAppSelector = useSelector.withTypes<RootState>();
/** A hook to access the global store's dispatch function */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
