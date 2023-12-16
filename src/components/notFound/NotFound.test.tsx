/* eslint-disable testing-library/no-node-access */
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import App from '../app/App';
import { MemoryRouter } from 'react-router-dom';

describe('component NotFounde', () => {
  it('Test - the component NotFound is displayed in the DOM', () => {
    render(<NotFound />);

    expect(screen.getAllByTestId('not-found'));
  });

  it('Test - the presence of an error when navigating to a non-existent page', () => {
    render(
      <MemoryRouter initialEntries={['/anyadress']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Error 404')).toBeInTheDocument();
    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
