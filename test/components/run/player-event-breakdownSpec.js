import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayerEventBreakdown from '../../../src/components/run/player-event-breakdown';
import { runFixtures } from '../../../src/objects/run';

configure({ adapter: new Adapter() });

const VALID_RUN = runFixtures[0];

describe('COMPONENT: RUN > Player Event Breakdown', () => {
  describe('render states', () => {
    it('renders nothing if invalid run passed', () => {
      const component = mount(<PlayerEventBreakdown run={{}} />);

      expect(component.html()).toBeNull();
    });

    it('renders a table if valid run passed', () => {
      const component = mount(<PlayerEventBreakdown run={VALID_RUN} />);

      expect(component.find('table').length).toBe(1);
    });
  });
});
