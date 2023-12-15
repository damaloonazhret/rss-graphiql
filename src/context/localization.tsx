import React, { Dispatch, ReactNode, useEffect } from 'react';
import { createContext, useState } from 'react';
import { Language } from '../types/enums';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

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
    setupLanguageData();
  }, []);

  useEffect(() => {
    setupLanguageData();
    localStorage.setItem('language', language);
  }, [language]);

  const setupLanguageData = () => {
    switch (language) {
      case Language.EN:
        setLanguageData(en);
        return en;
      case Language.RU:
        setLanguageData(ru);
        return ru;
      default:
        setLanguageData(en);
        return en;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languageData }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
