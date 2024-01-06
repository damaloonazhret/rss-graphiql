import { PanelResizeHandle } from 'react-resizable-panels';

import styles from './GraphiLayout.module.css';

export default function GraphiqlLayoutHandel({
  className = '',
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <PanelResizeHandle className={[styles.ResizeHandleOuter, className].join(' ')} id={id}>
      <div className={styles.ResizeHandleInner}>
        <img src="/assets/img/three-point.svg"></img>
      </div>
    </PanelResizeHandle>
  );
}
