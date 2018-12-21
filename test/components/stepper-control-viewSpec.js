import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StepperControlView from '../../src/components/stepper-control-view';

configure({ adapter: new Adapter() });

describe('COMPONENT: Prerun > Stepper Control View', () => {
  describe('renders', () => {
    it('has two buttons', () => {
      const component = mount(<StepperControlView />);

      expect(component.find('Button').length).toBe(2);
    });
  });

  describe('props defaults', () => {
    let component;
    beforeEach(() => {
      component = mount(<StepperControlView />);
    });

    it('sets hideNext', () => {
      expect(component.props().hideNext).toBeFalsy();
    });

    it('sets hideBack', () => {
      expect(component.props().hideBack).toBeFalsy();
    });

    it('sets disableNext', () => {
      expect(component.props().disableNext).toBeFalsy();
    });

    it('sets disableback', () => {
      expect(component.props().disableBack).toBeFalsy();
    });

    it('sets onBack', () => {
      expect(component.props().onBack).toBeDefined();
    });

    it('sets disableback ', () => {
      expect(component.props().onNext).toBeDefined();
    });
  });

  describe('click behaviors', () => {
    it('calls onBack on click', () => {
      const clickSpy = jasmine.createSpy('clickSpy');
      const component = mount(<StepperControlView
        onBack={clickSpy}
      />);
      component.find('Button.backButton').simulate('click');

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('calls onNext on click', () => {
      const clickSpy = jasmine.createSpy('clickSpy');
      const component = mount(<StepperControlView
        onNext={clickSpy}
      />);
      component.find('Button.nextButton').simulate('click');

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('disable behaviors', () => {
    it('doesnt onNext on click', () => {
      const clickSpy = jasmine.createSpy('clickSpy');
      const component = mount(<StepperControlView
        onNext={clickSpy}
        disableNext
      />);
      component.find('Button.nextButton').simulate('click');

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('doesnt onBack on click', () => {
      const clickSpy = jasmine.createSpy('clickSpy');
      const component = mount(<StepperControlView
        onBack={clickSpy}
        disableBack
      />);
      component.find('Button.backButton').simulate('click');

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('hide button behaviors', () => {
    it('hides back', () => {
      const component = mount(<StepperControlView
        hideBack
      />);

      expect(component.find('Button').length).toBe(1);
    });

    it('hides next', () => {
      const component = mount(<StepperControlView
        hideNext
      />);

      expect(component.find('Button').length).toBe(1);
    });
  });
});
