import styles from './QueryEditor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { responseSectionActions } from '../../../redux/slices/respnoseSectionSlice';
import { useState, useRef } from 'react';
import { selectApiEndpoint } from '../../../redux/slices/apiSlice';
import LineNumber from '../../lineNumber/LineNumber';
import { RootState } from '../../../redux/store.ts';
import dynamicAddSymbol from '../../../services/dynamicAddSymbol';
import { closingButtonActions } from '../../../redux/slices/closingButtonSlice.ts';
import { useContext } from 'react';
import { LanguageContext } from '../../../context/localization.tsx';

interface MyElementRefCurrent {
  offsetHeight: number;
}

const QueryEditor = () => {
  const dispatch = useDispatch();
  const url = useSelector(selectApiEndpoint);
  const { languageData } = useContext(LanguageContext);

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
  const closingButtonHeaders = useSelector(
    (state: RootState) => state.closingButton.stateClosingHeaders
  );

  const closingButtonVariables = useSelector(
    (state: RootState) => state.closingButton.stateClosingVariables
  );

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

  function closingButtonH() {
    if (!closingButtonHeaders) {
      dispatch(closingButtonActions.setClosingButtonHeadresSlice(true));
    } else {
      dispatch(closingButtonActions.setClosingButtonHeadresSlice(false));
    }
  }

  function closingButtonV() {
    if (!closingButtonVariables) {
      dispatch(closingButtonActions.setClosingButtonVariablesSlice(true));
    } else {
      dispatch(closingButtonActions.setClosingButtonVariablesSlice(false));
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
        <button className={styles.executeButton} onClick={makeRequest}>
          <img src="assets/img/execute-button.svg"></img>
        </button>
        <button className={styles.closingButton} onClick={closingButtonH}>
          <span>{languageData.buttonH}</span>
        </button>
        <button className={styles.closingButton} onClick={closingButtonV}>
          <span>{languageData.buttonV}</span>
        </button>
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
