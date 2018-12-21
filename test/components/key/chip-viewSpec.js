import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChipView from '../../../src/components/key/chip-view';
import keys from '../../../src/fixtures/keys';

configure({ adapter: new Adapter() });

const VALID_KEYSTONE = keys[0];
const INVALID_KEYSTONE = {};

describe('COMPONENT: Keystone/Chip View', () => {
  describe('conditional rendering', () => {
    it('does not render a Chip if keystone is undefined', () => {
      const component = mount(<ChipView />);

      expect(component.find('Chip').length).toBe(0);
    });

    it('renders a Chip if a VALID keystone is defined', () => {
      const component = mount(<ChipView keystone={VALID_KEYSTONE} />);

      expect(component.find('Chip').length).toBe(1);
    });

    it('does not render a Chip if an INVALID keystone is defined', () => {
      const component = mount(<ChipView keystone={INVALID_KEYSTONE} />);

      expect(component.find('Chip').length).toBe(0);
    });
  });
});
