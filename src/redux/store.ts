import { configureStore } from '@reduxjs/toolkit';
import schemaReducer from './slices/schemaSlice.ts';
import apiReducer from './slices/apiSlice.ts';
import { responseSectionReducer } from './slices/respnoseSectionSlice';
import { variablesSectionReducer } from './slices/variablesSectionSlice';

const store = configureStore({
  reducer: {
    schema: schemaReducer,
    api: apiReducer,
    responseSection: responseSectionReducer,
    variablesSection: variablesSectionReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
