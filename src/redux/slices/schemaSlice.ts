import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QueryType = {
  __schema: {
    queryType: {
      fields: {
        name: string;
      }[];
    };
  };
};
interface SchemaState {
  schemaInfo: QueryType | null;
  loading: boolean;
  error: string | null;
}

const initialState: SchemaState = {
  schemaInfo: null,
  loading: true,
  error: null,
};

const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setSchemaInfo: (state, action: PayloadAction<QueryType>) => {
      state.schemaInfo = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setSchemaInfo, setLoading, setError } = schemaSlice.actions;

export default schemaSlice.reducer;
