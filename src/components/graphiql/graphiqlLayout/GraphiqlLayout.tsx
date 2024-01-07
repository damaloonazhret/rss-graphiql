import styles from './GraphiLayout.module.css';
import { Panel, PanelGroup } from 'react-resizable-panels';
import QueryEditor from '../queryEditor/QueryEditor';
import HeadersEditor from '../headersEditor/HeadersEditor';
import VariablesEditor from '../variablesEditor/VariablesEditor';
import ResponseSection from '../responseSection/ResponseSection';
import GraphiqlLayoutHandel from './GraphiqlLayoutHandel';
import SchemaPage from '../../schemaPage/SchemaPage';
import { useContext } from 'react';
import { LanguageContext } from '../../../context/localization.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store.ts';

const GraphiqlLayout = () => {
  const { languageData } = useContext(LanguageContext);
  const closingButtonHeaders = useSelector(
    (state: RootState) => state.closingButton.stateClosingHeaders
  );
  const closingButtonVariables = useSelector(
    (state: RootState) => state.closingButton.stateClosingVariables
  );

  return (
    <>
      <h1>GraphiQL</h1>
      <div className={styles.wrapper}>
        <SchemaPage />
        <div className={styles.closingButton}></div>
        <div className={styles.Container}>
          <div className={styles.TopRow}></div>
          <div className={styles.BottomRow}>
            <PanelGroup autoSaveId="example" direction="horizontal">
              <Panel defaultSize={50} minSize={30}>
                <PanelGroup autoSaveId="example" direction="vertical">
                  <>
                    <Panel className={styles.Panel} order={1} minSize={20} defaultSize={70}>
                      <div className={`${styles.PanelContent}`}>
                        <QueryEditor />
                      </div>
                    </Panel>
                    {!closingButtonHeaders && (
                      <>
                        <GraphiqlLayoutHandel />
                        <div className={styles.titleSection}>
                          <span>{languageData.headers}</span>
                        </div>
                        <Panel className={`${styles.Panel}`} order={2} defaultSize={30} minSize={0}>
                          <div className={`${styles.PanelContent}`}>
                            <HeadersEditor />
                          </div>
                        </Panel>
                      </>
                    )}
                    {!closingButtonVariables && (
                      <>
                        <GraphiqlLayoutHandel />
                        <div className={styles.titleSection}>
                          <span>{languageData.variables}</span>
                        </div>
                        <Panel
                          className={`${styles.Panel} ${styles[`br-4`]}`}
                          order={2}
                          defaultSize={30}
                          minSize={0}
                        >
                          <div className={`${styles.PanelContent}`}>
                            <VariablesEditor />
                          </div>
                        </Panel>
                      </>
                    )}
                  </>
                </PanelGroup>
              </Panel>
              <GraphiqlLayoutHandel />
              <Panel className={`${styles.Panel} ${styles[`br-3`]}`} defaultSize={50} minSize={30}>
                <div className={`${styles.PanelContent}`}>
                  <ResponseSection />
                </div>
              </Panel>
            </PanelGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphiqlLayout;
