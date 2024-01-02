import styles from './ResponseSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store.ts';

const ResponseSection = () => {
  const responseSectionText = useSelector(
    (state: RootState) => state.responseSection.responseSectionText
  );

  return (
    <>
      <div className={styles.response}>
        <pre>{JSON.stringify(responseSectionText, null, 2)}</pre>
      </div>
    </>
  );
};

export default ResponseSection;
