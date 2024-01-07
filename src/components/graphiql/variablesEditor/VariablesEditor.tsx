import styles from './VariablesEditor.module.css';
import LineNumber from '../../lineNumber/LineNumber';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { variablesSectionActions } from '../../../redux/slices/variablesSectionSlice';
import dynamicAddSymbol from '../../../services/dynamicAddSymbol';

interface MyElementRefCurrent {
  offsetHeight: number;
}

const VariablesEditor = () => {
  const initCode = `{
    "name": "rick"
}`;

  const dispatch = useDispatch();
  const [quantityLine, useQuantityLine] = useState(1);
  const myElementRef = useRef<HTMLInputElement>(null);
  const rowHeight = 20;

  function handleCodeChange() {
    if (myElementRef.current) {
      const myElementRefCurrent: MyElementRefCurrent = myElementRef.current;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useQuantityLine(myElementRefCurrent.offsetHeight / rowHeight);
      dispatch(variablesSectionActions.setVariablesSectionCode(myElementRef.current.innerText));
    }
  }

  setTimeout(handleCodeChange, 0);

  return (
    <>
      <div className={styles.variablesEditor} data-testid="variablesEditor">
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
            {initCode}
          </pre>
        </div>
      </div>
    </>
  );
};

export default VariablesEditor;
