import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FinishRunPage from '../../src/containers/FInishRunPage';

configure({ adapter: new Adapter() });

describe('CONTAINER: Finish Run Page', () => {
  describe('render default', () => {
    let component;

    beforeEach(() => {
      component = mount(<FinishRunPage />);
    });

    it('renders without error', () => {
      expect(component).toBeDefined();
    });

    it('renders a textarea', () => {
      expect(component.find('TextField').length).toBe(1);
    });
  });
});
