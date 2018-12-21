import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import KeyCreator, { defaultKeystone } from '../../../src/components/key/key-creator';
import keyFixtures from '../../../src/fixtures/keys';

configure({ adapter: new Adapter() });

describe('COMPONENT: Key Creator', () => {
  let VALID_KEYSTONE;
  let INVALID_KEYSTONE;

  beforeEach(() => {
    [VALID_KEYSTONE] = keyFixtures;
    INVALID_KEYSTONE = {
      map: 10, level: 40, affixesOnHere: [0, 1, -1],
    };
  });

  describe('rendering', () => {
    it('renders if no keystone prop is passed', () => {
      const component = mount(<KeyCreator />);

      expect(component).toBeDefined();
      expect(component.state().keystone).toEqual(defaultKeystone());
    });

    it('renders if a keystone prop is passed', () => {
      const component = mount(<KeyCreator keystone={VALID_KEYSTONE} />);

      expect(component).toBeDefined();
      expect(component.state().keystone).toEqual(VALID_KEYSTONE);
    });

    it('renders if an invalid keystone prop is passed', () => {
      const component = mount(<KeyCreator keystone={INVALID_KEYSTONE} />);

      expect(component).toBeDefined();
    });
  });

  describe('controls', () => {
    let component;

    beforeEach(() => {
      component = mount(<KeyCreator />);
    });

    it('has a map selector', () => {
      expect(component.find('Select.DungeonSelector').length).toBe(1);
    });

    it('has a level selector', () => {
      expect(component.find('Slider.LevelSelector').length).toBe(1);
    });

    it('has 4 affix selectors', () => {
      expect(component.find('Select.AffixSelector').length).toBe(4);
    });

    it('has 0 disabled affix selectors at level 10', () => {
      component.state().keystone.difficulty = 10;
      const disabledAffixes = component.find('Select.DisabledAffixSelector');

      expect(disabledAffixes.length).toBe(0);
    });

    it('has 1 disabled affix selectors at level 7', () => {
      const prevState = component.state();
      component.setState({ keystone: { ...prevState.keystone, difficulty: 7 } });
      const disabledAffixes = component.find('Select.DisabledAffixSelector');

      expect(disabledAffixes.length).toBe(1);
    });

    it('has 2 disabled affix selectors at level 4', () => {
      const prevState = component.state();
      component.setState({ keystone: { ...prevState.keystone, difficulty: 4 } });
      const disabledAffixes = component.find('Select.DisabledAffixSelector');

      expect(disabledAffixes.length).toBe(2);
    });

    it('has 3 disabled affix selectors at level 2', () => {
      const prevState = component.state();
      component.setState({ keystone: { ...prevState.keystone, difficulty: 2 } });
      const disabledAffixes = component.find('Select.DisabledAffixSelector');

      expect(disabledAffixes.length).toBe(3);
    });

    it('has 4 disabled affix selectors at level 1', () => {
      const prevState = component.state();
      component.setState({ keystone: { ...prevState.keystone, difficulty: 1 } });
      const disabledAffixes = component.find('Select.DisabledAffixSelector');

      expect(disabledAffixes.length).toBe(4);
    });
  });
});
