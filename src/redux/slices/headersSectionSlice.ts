import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  headersSectionCode: string;
}

const initialState: InitialState = {
  headersSectionCode: ``,
};

const headersSectionSlice = createSlice({
  name: 'headersSectionText',
  initialState,
  reducers: {
    setHeadersSectionCode: (state, actions) => {
      return { ...state, headersSectionCode: actions.payload };
    },
  },
});

export const headersSectionActions = headersSectionSlice.actions;

export const headersSectionReducer = headersSectionSlice.reducer;
