import { it, describe, vi } from 'vitest';
import { render } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { LanguageProvider } from '../../context/localization';

describe('component Header', () => {
  vi.mock('react-firebase-hooks/auth', () => {
    return {
      useAuthState: vi.fn(),
    };
  });

  it('Test - when the user is not logged in', () => {
    const user = null as unknown as User;

    vi.mocked(useAuthState).mockReturnValue([user, false, undefined]);
    render(
      <LanguageProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </LanguageProvider>
    );

    /* expect(screen.getAllByTestId('header'));
    expect(screen.getByRole('link', { name: 'Sing In' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sing Up' })).toBeInTheDocument(); */
  });

  it('Test - when the user is logged in', () => {
    const user = {
      email: 'evgeniy@a.ru',
    } as unknown as User;

    vi.mocked(useAuthState).mockReturnValue([user, false, undefined]);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    /* expect(screen.getAllByTestId('header'));
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument(); */
  });
});
