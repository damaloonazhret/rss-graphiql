import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import VariablesEditor from './VariablesEditor';
import store from '../../../redux/store';

describe('component VariablesEditor', () => {
  it('Test - the component VariablesEditor is displayed in the DOM', () => {
    render(
      <Provider store={store}>
        <VariablesEditor />
      </Provider>
    );

    expect(screen.getAllByTestId('variablesEditor'));
  });
});
