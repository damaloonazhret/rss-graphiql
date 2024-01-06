import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  variablesSectionCode: string;
}

const initialState: InitialState = {
  variablesSectionCode: ``,
};

const variablesSectionSlice = createSlice({
  name: 'variablesSectionText',
  initialState,
  reducers: {
    setVariablesSectionCode: (state, actions) => {
      return { ...state, variablesSectionCode: actions.payload };
    },
  },
});

export const variablesSectionActions = variablesSectionSlice.actions;

export const variablesSectionReducer = variablesSectionSlice.reducer;
