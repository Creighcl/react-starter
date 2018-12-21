import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CardView from '../../../src/components/party/card-view';
import parties from '../../../src/fixtures/parties';
import typoView from '../../../src/components/player/typo-view';

configure({ adapter: new Adapter() });

const VALID_PARTY = parties[0];
const INVALID_PARTY = {};

describe('COMPONENT: Party/Card View', () => {
  describe('conditional rendering', () => {
    it('does not render a card if party is undefined', () => {
      const component = mount(<CardView />);

      expect(component.find('Card').length).toBe(0);
    });

    it('renders a card if a VALID party is defined', () => {
      const component = mount(<CardView party={VALID_PARTY} />);

      expect(component.find('Card').length).toBe(1);
    });

    it('does not render a card if an INVALID party is defined', () => {
      const component = mount(<CardView party={INVALID_PARTY} />);

      expect(component.find('Card').length).toBe(0);
    });
  });

  describe('party member render', () => {
    it('renders a TypogPlayer for each player', () => {
      const component = mount(<CardView party={VALID_PARTY} />);
      const countOfPlayers = VALID_PARTY.players.length;

      expect(component.find(typoView).length).toBe(countOfPlayers);
    });
  });
});
