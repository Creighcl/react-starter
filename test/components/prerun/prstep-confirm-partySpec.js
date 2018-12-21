import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StepperStepConfirmParty from '../../../src/components/prerun/prstep-confirm-party';

configure({ adapter: new Adapter() });

describe('COMPONENT: Prerun Step > Confirm Party', () => {
  describe('renders', () => {
    it('renders without error', () => {
      const component = mount(<StepperStepConfirmParty />);

      expect(component).toBeDefined();
    });
  });
});
