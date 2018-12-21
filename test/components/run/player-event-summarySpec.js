import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayerEventSummary from '../../../src/components/run/player-event-summary';
import { TILE_CLASSNAME } from '../../../src/components/run/constants';
import { runFixtures } from '../../../src/objects/run';

configure({ adapter: new Adapter() });

const INVALID_RUN_PROP = {};
const VALID_RUN_PROP = runFixtures[0];

describe('COMPONENT: RUN > Player Event Summary', () => {
  describe('render states', () => {
    it('renders nothing if no valid run prop passed', () => {
      const component = mount(<PlayerEventSummary run={INVALID_RUN_PROP} />);

      expect(component.html()).toBeNull();
    });

    it('renders 3 tiles', () => {
      const component = mount(<PlayerEventSummary run={VALID_RUN_PROP} />);

      expect(component.find(`.${TILE_CLASSNAME}`).length).toBe(3);
    });
  });
});
