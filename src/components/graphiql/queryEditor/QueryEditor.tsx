import styles from './QueryEditor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { responseSectionActions } from '../../../redux/slices/respnoseSectionSlice';
import { useState, useRef } from 'react';
import { selectNewApi } from '../../../redux/slices/apiSlice';

interface MyElementRefCurrent {
  offsetHeight: number;
}

const QueryEditor = () => {
  const dispatch = useDispatch();
  const url = useSelector(selectNewApi);

  const initialText = `# Example
# API - https://rickandmortyapi.graphcdn.app
# Comments should be deleted

query {
  characters{
    results{
      name
    }
  }
}`;

  const [quantityLine, useQuantityLine] = useState(1);
  const myElementRef = useRef<HTMLInputElement>(null);
  const rowHeight = 20;

  function handleCodeChange() {
    if (myElementRef.current) {
      const myElementRefCurrent: MyElementRefCurrent = myElementRef.current;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useQuantityLine(myElementRefCurrent.offsetHeight / rowHeight);
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

  const makeRequest = async () => {
    dispatch(responseSectionActions.setResponseSectionLoad(true));
    try {
      if (myElementRef.current) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: myElementRef.current.innerText.replace(/\s/g, ''),
          }),
        });

        const result = await response.json();
        dispatch(responseSectionActions.setResponseSectionText(result));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(responseSectionActions.setResponseSectionLoad(false));
  };

  return (
    <>
      <div className={styles.topBarWrap}>
        {
          <button className={styles.executeButton} onClick={makeRequest}>
            <img src="src/assets/img/execute-button.svg"></img>
          </button>
        }
      </div>
      <div className={styles.queryEditor}>
        <div className={styles.lineNumber}>
          {(() => {
            const line = [];

            for (let i = 1; i <= quantityLine; i++) {
              line.push(<span>{i}</span>);
            }

            return line;
          })()}
        </div>
        <div className={styles.queryCode}>
          <pre
            ref={myElementRef}
            contentEditable="true"
            spellCheck="false"
            suppressContentEditableWarning={true}
            onInput={handleCodeChange}
            onKeyDown={handleKeyPress}
          >
            {initialText}
          </pre>
        </div>
      </div>
    </>
  );
};

export default QueryEditor;
