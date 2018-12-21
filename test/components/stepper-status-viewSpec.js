import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StepperStatusView from '../../src/components/stepper-status-view';

configure({ adapter: new Adapter() });

describe('COMPONENT: Prerun > Stepper Status View', () => {
  describe('renders', () => {
    let validStepArray;
    beforeEach(() => {
      validStepArray = ['abc', 'def'];
    });

    it('renders on valid array', () => {
      const container = mount(<StepperStatusView activeStep={2} stepLabels={validStepArray} />);

      expect(container.find('Stepper').length).toBe(1);
    });

    it('defaults to activeStep=1', () => {
      const container = mount(<StepperStatusView stepLabels={validStepArray} />);

      expect(container.props().activeStep).toBe(1);
      expect(container.find('Stepper').length).toBe(1);
    });

    it('draws a Step foreach in props', () => {
      const container = mount(<StepperStatusView stepLabels={validStepArray} />);

      expect(container.find('Step').length).toBe(validStepArray.length);
    });
  });

  describe('avoids rendering', () => {
    it('avoids when no step label array passed', () => {
      const container = mount(<StepperStatusView />);

      expect(container.find('Stepper').length).toBe(0);
    });

    it('avoids when non array passed', () => {
      const container = mount(<StepperStatusView stepLabels="abc" />);

      expect(container.find('Stepper').length).toBe(0);
    });

    it('avoids when empty array passed', () => {
      const container = mount(<StepperStatusView stepLabels={[]} />);

      expect(container.find('Stepper').length).toBe(0);
    });
  });
});
