import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App.tsx';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';
import { LanguageProvider } from './context/localization.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
