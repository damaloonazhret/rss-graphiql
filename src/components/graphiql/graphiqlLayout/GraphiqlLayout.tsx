import styles from './GraphiLayout.module.css';
import QueryEditor from '../queryEditor/QueryEditor';
import HeadersEditor from '../headersEditor/HeadersEditor';
import VariablesEditor from '../variablesEditor/VariablesEditor';
import ResponseSection from '../responseSection/ResponseSection';

const GraphiqlLayout = () => {
  return (
    <div className={styles.graphiql}>
      <QueryEditor />
      <HeadersEditor />
      <VariablesEditor />
      <ResponseSection />
    </div>
  );
};

export default GraphiqlLayout;
