import { useEffect, useState } from 'react';
import style from './SchemaPage.module.scss';
import { requestSchema } from '../../services/requestSchema.ts';

const SchemaPage = () => {
  const [schemaInfo, setSchemaInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchemaInfo = async () => {
      const result = await requestSchema();
      try {
        if (result.errors) {
          setError(result.errors[0].message);
        } else {
          setSchemaInfo(result.data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSchemaInfo();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>GraphQL Schema Info:</h2>
      <pre className={style.schema}>{JSON.stringify(schemaInfo, null, 2)}</pre>
    </div>
  );
};

export default SchemaPage;
