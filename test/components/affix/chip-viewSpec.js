import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChipView from '../../../src/components/affix/chip-view';

configure({ adapter: new Adapter() });

const VALID_AFFIX = 2;
const INVALID_AFFIX = undefined;

describe('COMPONENT: Affix/Chip View', () => {
  describe('conditional rendering', () => {
    it('does not render an Avatar without affix prop', () => {
      const component = mount(<ChipView />);

      expect(component.find('Chip').length).toBe(0);
    });

    it('renders an Avatar with a valid affix', () => {
      const component = mount(<ChipView affix={VALID_AFFIX} />);

      expect(component.find('Chip').length).toBe(1);
    });

    it('does not render an Avatar with an invalid affix', () => {
      const component = mount(<ChipView affix={INVALID_AFFIX} />);

      expect(component.find('Chip').length).toBe(0);
    });
  });

  describe('event behavior', () => {
    it('fires props onClick when clicked', () => {
      const clickSpy = jasmine.createSpy('clickSpy');
      const component = shallow(<ChipView affix={VALID_AFFIX} onClick={clickSpy} />);

      expect(clickSpy).not.toHaveBeenCalled();
      component.simulate('click');

      expect(clickSpy).toHaveBeenCalledWith();
    });
  });
});
