import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FakeKeyPage from '../../src/containers/FakeKeyPage';

configure({ adapter: new Adapter() });

describe('CONTAINER: Fake Key Page', () => {
  describe('state rendering', () => {
    it('renders without any props', () => {
      const component = mount(<FakeKeyPage />);

      expect(component).toBeDefined();
    });
  });

  describe('component features', () => {
    let component;
    beforeEach(() => {
      component = mount(<FakeKeyPage />);
    });

    it('has a textarea with class output', () => {
      expect(component.find('textarea.output').length).toBe(1);
    });

    it('has 5 inputs p1-p5 for players', () => {
      expect(component.find('input#player1').length).toBe(1);
      expect(component.find('input#player2').length).toBe(1);
      expect(component.find('input#player3').length).toBe(1);
      expect(component.find('input#player4').length).toBe(1);
      expect(component.find('input#player5').length).toBe(1);
    });
  });
});
