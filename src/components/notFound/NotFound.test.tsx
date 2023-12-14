/* eslint-disable testing-library/no-node-access */
import { test, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import App from '../app/App';
import { MemoryRouter } from 'react-router-dom';

describe('component NotFounde', () => {
  test('Test - availability class footer', () => {
    render(<NotFound />);

    const element = document.getElementsByClassName(`_not-found_93c38c`);

    expect(element.length).toBe(1);
  });

  test('Test - the presence of an error when navigating to a non-existent page', () => {
    render(
      <MemoryRouter initialEntries={['/anyadress']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Error 404')).toBeInTheDocument();
    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
