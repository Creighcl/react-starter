import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TimeBreakdownView from '../../../src/components/run/time-breakdown-view';
import { runFixtures } from '../../../src/objects/run';

configure({ adapter: new Adapter() });

const VALID_RUN = runFixtures[0];

describe('COMPONENT: RUN > Time Breakdown View', () => {
  describe('render states', () => {
    it('renders nothing if invalid run passed', () => {
      const component = mount(<TimeBreakdownView run={{}} />);

      expect(component.html()).toBeNull();
    });

    it('renders something if valid run passed', () => {
      const component = mount(<TimeBreakdownView run={VALID_RUN} />);

      expect(component.html()).not.toBeNull();
    });
  });
});
