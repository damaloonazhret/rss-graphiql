/* eslint-disable testing-library/no-node-access */
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('component Footer', () => {
  it('Test - availability element with class footer', () => {
    render(<Footer />);

    const element = document.getElementsByClassName(`_footer_d0d8de`);

    expect(element.length).toBe(1);
  });
});
