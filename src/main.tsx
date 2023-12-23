import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App.tsx';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';

import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { LanguageProvider } from './context/localization.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);
