import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FailedToCreateView from '../../../src/components/prerun/failed-to-create-view';

configure({ adapter: new Adapter() });

describe('COMPONENT: Prerun > Failed to Create View', () => {
  describe('renders', () => {
    it('successfully with no props', () => {
      const component = mount(<FailedToCreateView />);

      expect(component).toBeDefined();
    });
  });
});
