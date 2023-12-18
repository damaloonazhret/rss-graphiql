import { configureStore } from '@reduxjs/toolkit';
import schemaReducer from './slices/schemaSlice.ts';

const store = configureStore({
  reducer: {
    schema: schemaReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
