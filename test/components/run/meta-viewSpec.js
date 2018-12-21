import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MetaView from '../../../src/components/run/meta-view';
import { runFixtures } from '../../../src/objects/run';

configure({ adapter: new Adapter() });

const VALID_RUN = runFixtures[0];

describe('COMPONENT: RUN > Meta View', () => {
  describe('render states', () => {
    it('renders nothing if invalid run passed', () => {
      const component = mount(<MetaView run={{}} />);

      expect(component.html()).toBeNull();
    });

    it('renders something if valid run passed', () => {
      const component = mount(<MetaView run={VALID_RUN} />);

      expect(component.html()).not.toBeNull();
    });
  });
});
