import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BossEncounterBreakdown from '../../../src/components/run/boss-encounter-breakdown';
import { runFixtures } from '../../../src/objects/run';

configure({ adapter: new Adapter() });

const VALID_RUN = runFixtures[0];

describe('COMPONENT: RUN > Boss Encounter Breakdown', () => {
  describe('render states', () => {
    it('renders nothing if invalid state passed', () => {
      const component = mount(<BossEncounterBreakdown />);

      expect(component.html()).toBeNull();
    });

    it('renders a table if valid state passed', () => {
      const component = mount(<BossEncounterBreakdown run={VALID_RUN} />);

      expect(component.find('table').length).toBe(1);
    });
  });
});
