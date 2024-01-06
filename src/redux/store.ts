import { configureStore } from '@reduxjs/toolkit';
import schemaReducer from './slices/schemaSlice.ts';
import apiReducer from './slices/apiSlice.ts';
import { responseSectionReducer } from './slices/respnoseSectionSlice';
import { headersSectionReducer } from './slices/headersSectionSlice';
import { variablesSectionReducer } from './slices/variablesSectionSlice';

const store = configureStore({
  reducer: {
    schema: schemaReducer,
    api: apiReducer,
    headersSection: headersSectionReducer,
    variablesSection: variablesSectionReducer,
    responseSection: responseSectionReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
