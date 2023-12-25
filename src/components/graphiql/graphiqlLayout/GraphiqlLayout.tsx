import styles from './GraphiLayout.module.css';
import { Panel, PanelGroup } from 'react-resizable-panels';
import QueryEditor from '../queryEditor/QueryEditor';
import HeadersEditor from '../headersEditor/HeadersEditor';
import VariablesEditor from '../variablesEditor/VariablesEditor';
import ResponseSection from '../responseSection/ResponseSection';
import GraphiqlLayoutHandel from './GraphiqlLayoutHandel';
/* import SchemaPage from '../../schemaPage/SchemaPage'; */

const GraphiqlLayout = () => {
  return (
    <div className={styles.wrapper}>
      <h1>GraphiQL</h1>
      <button>Run</button>
      {/* <SchemaPage /> */}
      <div className={styles.Container}>
        <div className={styles.TopRow}></div>
        <div className={styles.BottomRow}>
          <PanelGroup autoSaveId="example" direction="horizontal">
            <Panel defaultSize={50} minSize={30}>
              <PanelGroup autoSaveId="example" direction="vertical">
                <>
                  <Panel className={styles.Panel} order={1} minSize={20} defaultSize={70}>
                    <div className={`${styles.PanelContent} ${styles[`br-1`]}`}>
                      <QueryEditor />
                    </div>
                  </Panel>
                  <GraphiqlLayoutHandel />
                  <Panel className={styles.Panel} order={2} defaultSize={30} minSize={20}>
                    <div className={`${styles.PanelContent} ${styles[`br-4`]}`}>
                      <HeadersEditor />
                      <VariablesEditor />
                    </div>
                  </Panel>
                </>
              </PanelGroup>
            </Panel>
            <GraphiqlLayoutHandel />
            <Panel className={styles.Panel} defaultSize={50} minSize={30}>
              <div className={`${styles.PanelContent} ${styles[`br-2-3`]}`}>
                <ResponseSection />
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>
  );
};

export default GraphiqlLayout;
