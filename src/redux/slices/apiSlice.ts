import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

export const defaultAPI = 'https://rickandmortyapi.graphcdn.app/';

interface ApiState {
  apiEndpoint: string;
  newApi: string;
  showInput: boolean;
}

const initialState: ApiState = {
  apiEndpoint: defaultAPI,
  newApi: '',
  showInput: false,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setApiEndpoint: (state, action: PayloadAction<string>) => {
      state.apiEndpoint = action.payload;
    },
    setShowInput: (state, action: PayloadAction<boolean>) => {
      state.showInput = action.payload;
    },
    setNewApiEndpoint: (state, action: PayloadAction<string>) => {
      state.newApi = action.payload;
    },
  },
});

export const { setApiEndpoint, setShowInput, setNewApiEndpoint } = apiSlice.actions;

export default apiSlice.reducer;

export const selectApiEndpoint = (state: RootState) => state.api.apiEndpoint;
export const selectShowInput = (state: RootState) => state.api.showInput;
export const selectNewApi = (state: RootState) => state.api.newApi;
