import styles from './QueryEditor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { responseSectionActions } from '../../../redux/slices/respnoseSectionSlice';
import { useState, useRef } from 'react';
import { selectApiEndpoint } from '../../../redux/slices/apiSlice';
import LineNumber from '../../lineNumber/LineNumber';
import { RootState } from '../../../redux/store.ts';
import dynamicAddSymbol from '../../../services/dynamicAddSymbol';

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

  const [quantityLine, setQuantityLine] = useState(1);
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
      setQuantityLine(myElementRefCurrent.offsetHeight / rowHeight);
    }
  }

  setTimeout(handleCodeChange, 0);

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
            onKeyDown={dynamicAddSymbol}
          >
            {initialText}
          </pre>
        </div>
      </div>
    </>
  );
};

export default QueryEditor;
