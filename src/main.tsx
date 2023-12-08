import './index.css';
import ReactDOM from 'react-dom/client';
import App from './components/app/App.tsx';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
