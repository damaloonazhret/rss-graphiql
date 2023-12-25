import styles from './QueryEditor.module.css';
import { useState, useRef } from 'react';

interface MyElementRefCurrent {
  offsetHeight: number;
}

const QueryEditor = () => {
  const initialText = '# queryEditor';
  const [quantityLine, useQuantityLine] = useState(1);
  const myElementRef = useRef(null);
  const rowHeight = 21;

  function handleContentChange() {
    if (myElementRef.current) {
      const myElementRefCurrent: MyElementRefCurrent = myElementRef.current;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useQuantityLine(myElementRefCurrent.offsetHeight / rowHeight);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          /* useQuantityLine(); */
        }}
      >
        Run
      </button>
      <div className={styles['query-editor']}>
        <div className={styles['line-number']}>
          {(() => {
            const line = [];

            for (let i = 1; i <= quantityLine; i++) {
              line.push(<span>{i}</span>);
            }

            return line;
          })()}
        </div>
        <div className={styles['query-code']}>
          <div
            ref={myElementRef}
            contentEditable="true"
            spellCheck="false"
            suppressContentEditableWarning={true}
            onInput={handleContentChange}
          >
            {initialText}
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryEditor;
