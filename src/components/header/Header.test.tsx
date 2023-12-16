import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

interface dataFirebaseUser {
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    createdAt: string;
    creationTime: string;
    lastLoginAt: string;
    lastSignInTime: string;
  };
  providerData: [];
  refreshToken: string;
  tenantId: null;
  delete: Promise<unknown>;
  getIdToken: string;
  getIdTokenResult: string;
  reload: string;
  toJSON: string;
  displayName: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
}

describe('component Header', () => {
  vi.mock('react-firebase-hooks/auth', () => {
    return {
      useAuthState: vi.fn(),
    };
  });

  it('Test - when the user is not logged in', () => {
    const user = null;

    vi.mocked(useAuthState).mockReturnValue([user]);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('header'));
    expect(screen.getByRole('link', { name: 'Sing In' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sing Up' })).toBeInTheDocument();
  });

  it('Test - when the user is logged in', () => {
    const user: dataFirebaseUser = {
      email: 'evgeniy@a.ru',
      emailVerified: false,
      isAnonymous: false,
      metadata: {
        createdAt: '1702286938240',
        creationTime: 'Mon, 11 Dec 2023 09:28:58 GMT',
        lastLoginAt: '1702756480758',
        lastSignInTime: 'Sat, 16 Dec 2023 19:54:40 GMT',
      },
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: { async delete() {} },
      getIdToken: '',
      getIdTokenResult: '',
      reload: '',
      toJSON: '',
      displayName: '',
      phoneNumber: '',
      photoURL: '',
      providerId: '',
      uid: '',
    };

    vi.mocked(useAuthState).mockReturnValue([user, false, undefined]);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('header'));
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
  });
});
