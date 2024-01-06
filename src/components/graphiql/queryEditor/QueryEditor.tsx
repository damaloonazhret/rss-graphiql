import styles from './QueryEditor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { responseSectionActions } from '../../../redux/slices/respnoseSectionSlice';
import { useState, useRef } from 'react';
import { selectApiEndpoint } from '../../../redux/slices/apiSlice';
import LineNumber from '../../lineNumber/LineNumber';
import { RootState } from '../../../redux/store.ts';

interface MyElementRefCurrent {
  offsetHeight: number;
}

const QueryEditor = () => {
  const dispatch = useDispatch();
  const url = useSelector(selectApiEndpoint);

  const initialText = `# API - https://rickandmortyapi.graphcdn.app
# Comments should be deleted

query (
  $name: String!
){
  
  characters(filter:{
    name: $name 
  }){
    results {
      name
    }
  }
}`;

  const [quantityLine, useQuantityLine] = useState(1);
  const myElementRef = useRef<HTMLInputElement>(null);
  const rowHeight = 20;

  const headersSectionCode = useSelector(
    (state: RootState) => state.headersSection.headersSectionCode
  );

  const variablesSectionCode = useSelector(
    (state: RootState) => state.variablesSection.variablesSectionCode
  );

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
    const headers = JSON.parse(headersSectionCode.replace(/'/g, '"'));

    let variablesSectionCodeParse = '';
    if (variablesSectionCode === '') {
      variablesSectionCodeParse = JSON.parse('"{}"');
    } else {
      variablesSectionCodeParse = JSON.parse(variablesSectionCode);
    }

    try {
      if (myElementRef.current) {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            query: myElementRef.current.innerText.replace(/\s/g, ''),
            variables: variablesSectionCodeParse,
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
            <img src="assets/img/execute-button.svg"></img>
          </button>
        }
      </div>
      <div className={styles.queryEditor}>
        <LineNumber quantityLine={quantityLine} />
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
