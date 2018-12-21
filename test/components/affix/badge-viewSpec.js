import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BadgeView from '../../../src/components/affix/badge-view';

configure({ adapter: new Adapter() });

const VALID_AFFIX = 2;
const INVALID_AFFIX = -1;

describe('COMPONENT: Affix/Badge View', () => {
  describe('conditional rendering', () => {
    it('does not render an Avatar without affix prop', () => {
      const component = mount(<BadgeView />);

      expect(component.find('Avatar').length).toBe(0);
    });

    it('renders an Avatar with a valid affix', () => {
      const component = mount(<BadgeView affix={VALID_AFFIX} />);

      expect(component.find('Avatar').length).toBe(1);
    });

    it('does not render an Avatar with an invalid affix', () => {
      const component = mount(<BadgeView affix={INVALID_AFFIX} />);

      expect(component.find('Avatar').length).toBe(0);
    });
  });

  describe('event behavior', () => {
    it('fires props onClick when clicked', () => {
      const clickSpy = jasmine.createSpy('clickSpy');
      const component = shallow(<BadgeView affix={VALID_AFFIX} onClick={clickSpy} />);

      expect(clickSpy).not.toHaveBeenCalled();
      component.simulate('click');

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });
  });
});
