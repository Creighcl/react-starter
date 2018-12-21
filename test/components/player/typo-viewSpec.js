import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TypoView from '../../../src/components/player/typo-view';
import players from '../../../src/objects/player';

configure({ adapter: new Adapter() });

const VALID_PLAYER = players[0];
const INVALID_PLAYER = {};

describe('COMPONENT: Player/Typo View', () => {
  describe('conditional rendering', () => {
    it('does not render a .playerDiv if player is undefined', () => {
      const component = mount(<TypoView />);

      expect(component.find('div').length).toBe(0);
    });

    it('renders a playerDiv if a VALID player is defined', () => {
      const component = mount(<TypoView player={VALID_PLAYER} />);

      expect(component.find('div').length).toBeGreaterThan(0);
    });

    it('does not render a playerDiv if an INVALID player is defined', () => {
      const component = mount(<TypoView player={INVALID_PLAYER} />);

      expect(component.find('div').length).toBe(0);
    });
  });
});
