import styles from './ResponseSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import { useContext } from 'react';
import { LanguageContext } from '../../../context/localization.tsx';

const ResponseSection = () => {
  const { languageData } = useContext(LanguageContext);
  const responseSectionText = useSelector(
    (state: RootState) => state.responseSection.responseSectionText
  );

  const respnseSectionLoad = useSelector(
    (state: RootState) => state.responseSection.responseSectionLoad
  );

  function showResponseSection() {
    if (responseSectionText != '') {
      return (
        <>
          {respnseSectionLoad ? (
            languageData.loading
          ) : (
            <pre>{JSON.stringify(responseSectionText, null, 2)}</pre>
          )}
        </>
      );
    }
    return <></>;
  }

  return (
    <div className={styles.response} data-testid="ResponseSection">
      {showResponseSection()}
    </div>
  );
};

export default ResponseSection;
