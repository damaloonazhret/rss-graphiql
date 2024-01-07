import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import GraphiqlLayout from './GraphiqlLayout';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

describe('component GraphiqlLayout', () => {
  it('Test - GraphiqlLayout', () => {
    const { container } = render(
      <Provider store={store}>
        <GraphiqlLayout />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
