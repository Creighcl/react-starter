import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StepperStepEP from '../../../src/components/prerun/prstep-encoded-party';

configure({ adapter: new Adapter() });

describe('COMPONENT: Prerun Step > Encoded Party', () => {
  describe('renders', () => {
    it('renders without error', () => {
      const component = mount(<StepperStepEP />);

      expect(component).toBeDefined();
    });
  });
});
