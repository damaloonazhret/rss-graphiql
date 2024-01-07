import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  stateClosingHeaders: boolean;
  stateClosingVariables: boolean;
}

const initialState: InitialState = {
  stateClosingHeaders: false,
  stateClosingVariables: false,
};

const closingButtonSlice = createSlice({
  name: 'closingButtonSlice',
  initialState,
  reducers: {
    setClosingButtonHeadresSlice: (state, actions) => {
      return { ...state, stateClosingHeaders: actions.payload };
    },
    setClosingButtonVariablesSlice: (state, actions) => {
      return { ...state, stateClosingVariables: actions.payload };
    },
  },
});

export const closingButtonActions = closingButtonSlice.actions;

export const closingButtonReducer = closingButtonSlice.reducer;
