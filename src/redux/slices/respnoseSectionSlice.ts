import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  responseSectionText: string;
  responseSectionLoad: boolean;
}

const initialState: InitialState = {
  responseSectionText: '',
  responseSectionLoad: false,
};

const responseSectionSlice = createSlice({
  name: 'responseSectionText',
  initialState,
  reducers: {
    setResponseSectionText: (state, actions) => {
      return { ...state, responseSectionText: actions.payload };
    },
    setResponseSectionLoad: (state, action) => {
      return { ...state, responseSectionLoad: action.payload };
    },
  },
});

export const responseSectionActions = responseSectionSlice.actions;

export const responseSectionReducer = responseSectionSlice.reducer;
