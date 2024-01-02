import { configureStore } from '@reduxjs/toolkit';
import schemaReducer from './slices/schemaSlice.ts';
import apiReducer from './slices/apiSlice.ts';
import { responseSectionReducer } from './slices/respnoseSectionSlice';

const store = configureStore({
  reducer: {
    schema: schemaReducer,
    api: apiReducer,
    responseSection: responseSectionReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
