import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BannerView from '../../../src/components/key/banner-view';
import keys from '../../../src/fixtures/keys';

configure({ adapter: new Adapter() });

const VALID_KEYSTONE = keys[0];
const INVALID_KEYSTONE = {};

describe('COMPONENT: Keystone/Banner View', () => {
  describe('conditional rendering', () => {
    it('does not render a card if keystone is undefined', () => {
      const component = mount(<BannerView />);

      expect(component.find('Card').length).toBe(0);
    });

    it('renders a card if a VALID keystone is defined', () => {
      const component = mount(<BannerView keystone={VALID_KEYSTONE} />);

      expect(component.find('Card').length).toBe(1);
    });

    it('does not render a card if an INVALID keystone is defined', () => {
      const component = mount(<BannerView keystone={INVALID_KEYSTONE} />);

      expect(component.find('Card').length).toBe(0);
    });
  });

  describe('affix rendering', () => {
    let testKey;
    beforeEach(() => {
      testKey = { ...VALID_KEYSTONE };
    });

    it('draws at least one affix badge', () => {
      testKey.affixes = [2, 3, 4];
      testKey.difficulty = 10;
      const component = mount(<BannerView keystone={testKey} />);

      expect(component.find('Avatar').length).toBeGreaterThan(1);
    });
  });
});
