import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/localization';

describe('LoginForm', () => {
  it('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <LoginForm />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getAllByText('Login')[0]).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('displays error messages for invalid inputs', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <LoginForm />
        </LanguageProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(
      await screen.findByText('Invalid email address, please enter a valid email address')
    ).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });
});
