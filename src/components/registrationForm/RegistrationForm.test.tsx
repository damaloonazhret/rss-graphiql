import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm', () => {
  it('renders registration form correctly', () => {
    render(<RegistrationForm />);

    expect(screen.getByText('Registration')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('displays error messages for invalid inputs', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'short' } });
    fireEvent.change(screen.getByLabelText('Password confirm:'), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    expect(
      await screen.findByText('Invalid email address, please enter a valid email address')
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Password must have at least 8 characters, contain 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
      )
    ).toBeInTheDocument();
  });
});
