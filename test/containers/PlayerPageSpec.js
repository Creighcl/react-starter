import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayerPage from '../../src/containers/PlayerPage';

configure({ adapter: new Adapter() });

describe('CONTAINER: Player Page', () => {
  describe('render states', () => {
    it('renders without props', () => {
      const component = shallow(<PlayerPage />);

      expect(component).toBeDefined();
    });
  });
});
