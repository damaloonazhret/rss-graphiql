import { useEffect } from 'react';
import style from './SchemaPage.module.scss';
import { defaultAPI, requestSchema } from '../../services/requestSchema.ts';
import { RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading, setSchemaInfo } from '../../redux/slices/schemaSlice.ts';

const SchemaPage = () => {
  const dispatch = useDispatch();
  const { schemaInfo, loading, error } = useSelector((state: RootState) => state.schema);

  useEffect(() => {
    const fetchSchemaInfo = async () => {
      dispatch(setLoading(true));
      const result = await requestSchema();
      console.log(result.data);
      try {
        if (result.errors) {
          dispatch(setError(result.errors[0].message));
        } else {
          dispatch(setSchemaInfo(result.data));
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          dispatch(setError(error.message));
        } else {
          dispatch(setError('An unknown error occurred'));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSchemaInfo();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>GraphQL Schema Info:</h2>
      <button onClick={() => console.log(defaultAPI)} className={style.schemaButton}>
        Change API
      </button>
      <pre className={style.schema}>{JSON.stringify(schemaInfo, null, 2)}</pre>
    </div>
  );
};

export default SchemaPage;
