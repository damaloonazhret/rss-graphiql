import styles from './ResponseSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store.ts';

/* interface ResponseSectionText {
  responseSection: {
    responseSectionText: string;
  };
}

interface RespnseSectionLoad {
  responseSection: {
    responseSectionLoad: boolean;
  };
} */

const ResponseSection = () => {
  const responseSectionText = useSelector(
    (state: RootState) => state.responseSection.responseSectionText
  );

  const respnseSectionLoad = useSelector(
    (state: RootState) => state.responseSection.responseSectionLoad
  );

  function abc() {
    if (responseSectionText != '') {
      return (
        <>
          {respnseSectionLoad ? (
            'loading...'
          ) : (
            <pre>{JSON.stringify(responseSectionText, null, 2)}</pre>
          )}
        </>
      );
    }
    return <></>;
  }

  return <div className={styles.response}>{abc()}</div>;
};

export default ResponseSection;
