import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

interface dataFirebaseUser {
  email: string;
}

describe('component Header', () => {
  vi.mock('react-firebase-hooks/auth', () => {
    return {
      useAuthState: vi.fn(),
    };
  });

  it('Test - when the user is not logged in', () => {
    const user = null;

    // eslint-disable-next-line
    // @ts-ignore: Unreachable code error
    vi.mocked(useAuthState).mockReturnValue([user, false, undefined]);
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
      email: 'abc@abc.com',
    };

    // eslint-disable-next-line
    // @ts-ignore: Unreachable code error
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
