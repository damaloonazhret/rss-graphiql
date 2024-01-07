import { useAuthState } from 'react-firebase-hooks/auth';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../context/localization';
import App from '../app/App';
import NotFound from './NotFound';

describe('component NotFound', () => {
  it('Test - the component NotFound is displayed in the DOM', () => {
    render(<NotFound />);

    expect(screen.getAllByTestId('not-found'));
  });

  it('Test - the presence of an error when navigating to a non-existent page', () => {
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);

    render(
      <MemoryRouter initialEntries={['/wrongPath']}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Error 404')).toBeInTheDocument();
    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
