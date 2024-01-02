import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  responseSectionText: string;
}

const initialState: InitialState = {
  responseSectionText: '',
};

const responseSectionSlice = createSlice({
  name: 'responseSectionText',
  initialState,
  reducers: {
    setResponseSectionText: (state, actions) => {
      return { ...state, responseSectionText: actions.payload };
    },
  },
});

export const responseSectionActions = responseSectionSlice.actions;

export const responseSectionReducer = responseSectionSlice.reducer;
