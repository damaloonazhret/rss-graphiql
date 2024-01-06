import '@testing-library/jest-dom/vitest';
import { beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  createUserWithEmailAndPassword: vi
    .fn()
    .mockResolvedValueOnce({
      user: {},
    })
    .mockRejectedValueOnce(new Error('Registration failed.')),
  signInWithEmailAndPassword: vi
    .fn()
    .mockResolvedValueOnce({ user: { displayName: 'Test User' } })
    .mockRejectedValueOnce(new Error('Login failed.')),
  updateProfile: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => {
  return {
    useAuthState: vi.fn(),
  };
});

beforeEach(() => {
  cleanup();
});
