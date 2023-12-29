import { User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../context/localization';
import Header from './Header';

describe('component Header', () => {
  it('Test - when the user is not logged in', () => {
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('header'));
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Register' })).toBeInTheDocument();
  });

  it('Test - when the user is logged in', () => {
    const user: User = {
      email: 'test@test.com',
      emailVerified: true,
      isAnonymous: false,
      displayName: 'Test User',
      uid: '123',
      photoURL: null,
      phoneNumber: null,
      providerId: 'test',
      metadata: {
        creationTime: 'test',
        lastSignInTime: 'test',
      },
      providerData: [],
      tenantId: null,
      refreshToken: 'test',
      getIdToken: vi.fn(),
      getIdTokenResult: vi.fn(),
      reload: vi.fn(),
      delete: vi.fn(),
      toJSON: vi.fn(),
    };

    vi.mocked(useAuthState).mockReturnValue([user, false, undefined]);
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('header'));
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });
});
