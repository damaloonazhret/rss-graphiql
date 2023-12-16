/* eslint-disable testing-library/no-node-access */
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('Test - App', () => {
  render(
    <MemoryRouter initialEntries={['/anyadress']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('Error 404')).toBeInTheDocument();
  expect(screen.getByText('Not found page')).toBeInTheDocument();
});
