import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RunEventChart from '../../../src/components/run/run-event-chart';
import { runFixtures } from '../../../src/objects/run';

configure({ adapter: new Adapter() });
const KNOWN_DECODED_RUN = runFixtures[0];

describe('COMPONENT: RUN > Run Event Chart', () => {
  describe('render states', () => {
    it('displays a Chart when valid run passed', () => {
      const component = mount(<RunEventChart run={KNOWN_DECODED_RUN} />);

      expect(component.find('Chart').length).toBe(1);
    });

    it('renders nothing if invalid run', () => {
      const component = mount(<RunEventChart run={{}} />);

      expect(component.html()).toBe(null);
    });
  });
});
