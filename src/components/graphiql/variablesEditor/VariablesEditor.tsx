import styles from './VariablesEditor.module.css';
import CodeEditor from '../../codeEditor/CodeEditor';

const VariablesEditor = () => {
  const initCode = `{
    "name": "rick"
}`;

  return (
    <>
      <div className={styles.variablesTitle}>
        <span>Variables</span>
      </div>
      <div className={styles.variablesEditor}>
        <CodeEditor code={initCode} />
      </div>
    </>
  );
};

export default VariablesEditor;
