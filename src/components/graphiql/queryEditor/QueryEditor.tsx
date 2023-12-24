import styles from './QueryEditor.module.css';

const QueryEditor = () => {
  return (
    <div className={styles['query-editor']}>
      <div className={styles['line-number']}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <span>11</span>
      </div>
      <div className={styles['query-code']}>
        <div contentEditable="true" spellCheck="false" suppressContentEditableWarning={true}>
          # query-code
        </div>
      </div>
    </div>
  );
};

export default QueryEditor;
