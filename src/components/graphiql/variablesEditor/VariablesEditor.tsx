import styles from './VariablesEditor.module.css';
import CodeEditor from '../../codeEditor/CodeEditor';

const VariablesEditor = () => {
  return (
    <>
      <div className={styles.variablesTitle}>
        <span>Variables</span>
      </div>
      <div className={styles.variablesEditor}>
        <CodeEditor />
      </div>
    </>
  );
};

export default VariablesEditor;
