import styles from './HeaderEditor.module.css';
import LineNumber from '../../lineNumber/LineNumber';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { headersSectionActions } from '../../../redux/slices/headersSectionSlice';
import dynamicAddSymbol from '../../../services/dynamicAddSymbol';

interface MyElementRefCurrent {
  offsetHeight: number;
}

const HeadersEditor = () => {
  const dispatch = useDispatch();
  const [quantityLine, setQuantityLine] = useState(1);
  const myElementRef = useRef<HTMLInputElement>(null);
  const rowHeight = 20;

  function handleCodeChange() {
    if (myElementRef.current) {
      const myElementRefCurrent: MyElementRefCurrent = myElementRef.current;
      setQuantityLine(myElementRefCurrent.offsetHeight / rowHeight);
      dispatch(headersSectionActions.setHeadersSectionCode(myElementRef.current.innerText));
    }
  }

  setTimeout(handleCodeChange, 0);

  return (
    <>
      <div className={styles.headersEditor}>
        <LineNumber quantityLine={quantityLine} />
        <div className={styles.variablesCode}>
          <pre
            ref={myElementRef}
            contentEditable="true"
            spellCheck="false"
            suppressContentEditableWarning={true}
            onInput={handleCodeChange}
            onKeyDown={dynamicAddSymbol}
          >
            {`{
  'Content-Type': 'application/json'
}`}
          </pre>
        </div>
      </div>
    </>
  );
};

export default HeadersEditor;
