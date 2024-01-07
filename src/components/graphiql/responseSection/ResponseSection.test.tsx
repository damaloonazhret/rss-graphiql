import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ResponseSection from './ResponseSection';
import store from '../../../redux/store';

describe('component ResponseSection', () => {
  it('Test - the component ResponseSection is displayed in the DOM', () => {
    render(
      <Provider store={store}>
        <ResponseSection />
      </Provider>
    );

    expect(screen.getAllByTestId('ResponseSection'));
  });
});
