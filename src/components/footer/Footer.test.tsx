import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('component Footer', () => {
  it('Test - the component footer is displayed in the DOM', () => {
    render(<Footer />);

    expect(screen.getAllByTestId('footer'));
  });
});
