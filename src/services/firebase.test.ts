import { describe, expect, it } from 'vitest';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { loginUser, registerUser } from './firebase';

describe('Firebase service', () => {
  const testName = 'Test User';
  const testEmail = 'test@test.com';
  const testPassword = 'password';
  it('should registers a new user', async () => {
    await registerUser(testName, testEmail, testPassword);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      testEmail,
      testPassword
    );
    expect(updateProfile).toHaveBeenCalledWith(expect.objectContaining({}), {
      displayName: testName,
    });
  });

  it('should login a user', async () => {
    await loginUser(testEmail, testPassword);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      testEmail,
      testPassword
    );
  });
});
