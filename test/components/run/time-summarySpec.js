import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TimeSummary from '../../../src/components/run/time-summary';
import { TILE_CLASSNAME } from '../../../src/components/run/constants';
import { runFixtures } from '../../../src/objects/run';

configure({ adapter: new Adapter() });

const VALID_RUN = runFixtures[0];

describe('COMPONENT: RUN > Time Summary', () => {
  describe('render states', () => {
    it('renders nothing if no valid run passed', () => {
      const component = mount(<TimeSummary run={{}} />);

      expect(component.html()).toBeNull();
    });

    it('renders something if valid run passed', () => {
      const component = mount(<TimeSummary run={VALID_RUN} />);

      expect(component.find(`.${TILE_CLASSNAME}`).length).toBe(2);
    });
  });
});
