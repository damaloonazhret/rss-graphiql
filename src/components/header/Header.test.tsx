/* eslint-disable testing-library/no-node-access */
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('component Footer', () => {
  it('Test - ', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const element = document.getElementsByClassName(`_header_69e643`);

    expect(element.length).toBe(1);
    expect(screen.getByRole('link', { name: 'Sing In' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sing Up' })).toBeInTheDocument();
  });
});
