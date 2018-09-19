import React from 'react';
import renderer from 'react-test-renderer';

import NotFound from '../../pages/NotFound';

describe('<NotFound />', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<NotFound />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
