import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('component Main', () => {
  it('Test - the component main is displayed in the DOM', () => {
    render(<Main />);

    expect(screen.getAllByTestId('main'));
  });
});
