import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StepperStepChooseDungeon from '../../../src/components/prerun/prstep-choose-dungeon';

configure({ adapter: new Adapter() });

describe('COMPONENT: Prerun Step > Choose Dungeon', () => {
  describe('renders', () => {
    it('renders without error', () => {
      const component = mount(<StepperStepChooseDungeon />);

      expect(component).toBeDefined();
    });
  });
});
