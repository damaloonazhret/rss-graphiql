/* eslint-disable testing-library/no-node-access */
import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Main from './Main';

it('Test - availability element with class main', () => {
  render(<Main />);

  const element = document.getElementsByClassName('_main_158286');

  expect(element.length).toBe(1);
});
