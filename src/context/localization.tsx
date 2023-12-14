import React, { Dispatch, ReactNode, useEffect } from 'react';
import { createContext, useState } from 'react';
import { Language } from '../types/enums';

interface LanguageContext {
  language: Language;
  setLanguage: Dispatch<React.SetStateAction<Language>> | null;
  languageData: Record<string, string>;
}

const LanguageContext = createContext<LanguageContext>({
  language: 'EN' as Language,
  setLanguage: null,
  languageData: {},
});

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(
    (localStorage.getItem('language') as Language) || Language.EN
  );

  const [languageData, setLanguageData] = useState({});

  useEffect(() => {
    fetchLanguageData();
  }, []);

  useEffect(() => {
    fetchLanguageData();
    localStorage.setItem('language', language);
  }, [language]);

  const fetchLanguageData = () => {
    const dataUrl = `../locales/${language}.json`;
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => setLanguageData(data))
      .catch((error) => console.error('Error fetching language data:', error));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languageData }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
