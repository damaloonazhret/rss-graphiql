import React, { useContext, useEffect } from 'react';
import style from './SchemaPage.module.scss';
import { requestSchema } from '../../services/requestSchema.ts';
import { RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading, setSchemaInfo } from '../../redux/slices/schemaSlice.ts';
import {
  defaultAPI,
  selectApiEndpoint,
  selectNewApi,
  selectShowInput,
  setApiEndpoint,
  setNewApiEndpoint,
  setShowInput,
} from '../../redux/slices/apiSlice.ts';
import { LanguageContext } from '../../context/localization.tsx';

const SchemaPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.schema);
  const apiEndpoint = useSelector(selectApiEndpoint);
  const showInput = useSelector(selectShowInput);
  const newApi = useSelector(selectNewApi);
  const { languageData } = useContext(LanguageContext);

  useEffect(() => {
    const fetchSchemaInfo = async (api: string) => {
      dispatch(setLoading(true));
      const result = await requestSchema(api);

      try {
        if (result.error) {
          dispatch(setError(result.error));
        } else {
          dispatch(setSchemaInfo(result.data));
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          dispatch(setError(error.message));
        } else {
          dispatch(setError('An unknown error occurred'));
        }
      }
    };

    fetchSchemaInfo(apiEndpoint);
  }, [dispatch, apiEndpoint]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNewApiEndpoint(event.target.value));
  };

  const handleApiChange = () => {
    dispatch(setApiEndpoint(newApi));
    dispatch(setShowInput(false));
  };

  if (loading) return <p className={style.load}>{languageData.loading}</p>;
  if (error)
    return (
      <p className={style.schemaError}>
        Error: {error}
        <button onClick={() => dispatch(setApiEndpoint(defaultAPI))}>Reset API</button>
      </p>
    );

  return (
    <div className={style.apiBar}>
      <button onClick={() => dispatch(setShowInput(true))} className={style.schemaButton}>
        {languageData.changeAPI}
      </button>
      {showInput && (
        <>
          <input
            type="text"
            value={newApi}
            onChange={handleInputChange}
            placeholder={languageData.newAPI}
            className={style.schemaInputChangeApi}
          />
          <button className={style.schemaButton} onClick={handleApiChange}>
            {languageData.setAPI}
          </button>
        </>
      )}
    </div>
  );
};

export default SchemaPage;
