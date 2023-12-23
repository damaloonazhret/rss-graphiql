import { configureStore } from '@reduxjs/toolkit';
import schemaReducer from './slices/schemaSlice.ts';
import apiReducer from './slices/apiSlice.ts';

const store = configureStore({
  reducer: {
    schema: schemaReducer,
    api: apiReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
