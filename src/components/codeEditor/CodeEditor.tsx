import styles from './CodeEditor.module.css';
import LineNumber from '../lineNumber/LineNumber';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { variablesSectionActions } from '../../redux/slices/variablesSectionSlice';

interface MyElementRefCurrent {
  offsetHeight: number;
}

interface Props {
  code: string;
}

const VariablesEditor = (props: Props) => {
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

  //dynamically adding a character
  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    function addSymbol(symbol: string) {
      event.preventDefault();

      const getSelection = window.getSelection();

      if (getSelection) {
        const range = getSelection.getRangeAt(0);
        const tab = document.createTextNode(symbol);
        range.insertNode(tab);
        range.setStartAfter(tab);

        // move the text cursor to the left position
        const selection = window.getSelection();
        if (selection) {
          selection.modify('move', 'backward', 'character');
        }
      }
    }

    if (event.key === 'Tab') {
      addSymbol('\u00a0\u00a0\u00a0\u00a0');
    }

    if (event.key === "'") {
      addSymbol("''");
    }

    if (event.key === '"') {
      addSymbol('""');
    }

    if (event.key === '(') {
      addSymbol('()');
    }

    if (event.key === '{') {
      addSymbol('{}');
    }

    if (event.key === '[') {
      addSymbol('[]');
    }
  }

  return (
    <>
      <div className={styles.variablesEditor}>
        <LineNumber quantityLine={quantityLine} />
        <div className={styles.variablesCode}>
          <pre
            ref={myElementRef}
            contentEditable="true"
            spellCheck="false"
            suppressContentEditableWarning={true}
            onInput={handleCodeChange}
            onKeyDown={handleKeyPress}
          >
            {props.code}
          </pre>
        </div>
      </div>
    </>
  );
};

export default VariablesEditor;
