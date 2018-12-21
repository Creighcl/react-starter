import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PrerunCreator from '../../../src/components/prerun/prerun-creator';
import EncodedKeystoneGeneratedView from '../../../src/components/encoded-keystone/generated-view';
import StepperStatusView from '../../../src/components/stepper-status-view';
import StepperStepEP from '../../../src/components/prerun/prstep-encoded-party';
import StepperStepConfirmParty from '../../../src/components/prerun/prstep-confirm-party';
import StepperStepChooseDungeon from '../../../src/components/prerun/prstep-choose-dungeon';
import keystoneFixtures from '../../../src/fixtures/keys';

configure({ adapter: new Adapter() });

describe('COMPONENT: Prerun > Prerun Creator', () => {
  describe('renders', () => {
    it('successfully with no props', () => {
      const component = mount(<PrerunCreator />);

      expect(component).toBeDefined();
    });

    it('Loading step on state.loaeding', () => {
      const component = mount(<PrerunCreator />);
      component.setState({ loading: true });

      expect(component.find('AjaxSpinner').length).toBe(1);
      expect(component.find(StepperStatusView).length).toBe(0);
      expect(component.find(EncodedKeystoneGeneratedView).length).toBe(0);
      expect(component.find('FailedToCreateView').length).toBe(0);
    });

    it('ek generated step on state.submissionAccepted', () => {
      const component = mount(<PrerunCreator />);
      component.setState({
        submitted: true,
        submissionAccepted: true,
        loading: false,
      });

      expect(component.find('AjaxSpinner').length).toBe(0);
      expect(component.find(StepperStatusView).length).toBe(0);
      expect(component.find('FailedToCreateView').length).toBe(0);
      expect(component.find(EncodedKeystoneGeneratedView).length).toBe(1);
    });

    it('failed view on submitted, not loading, not accepted', () => {
      const component = mount(<PrerunCreator />);
      component.setState({
        loading: false,
        submissionAccepted: false,
        submitted: true,
      });

      expect(component.find('AjaxSpinner').length).toBe(0);
      expect(component.find(StepperStatusView).length).toBe(0);
      expect(component.find(EncodedKeystoneGeneratedView).length).toBe(0);
      expect(component.find('FailedToCreateView').length).toBe(1);
    });

    it('stepper when, not loading, not submitted', () => {
      const component = mount(<PrerunCreator />);
      component.setState({
        loading: false,
        submissionAccepted: false,
        submitted: false,
      });

      expect(component.find('AjaxSpinner').length).toBe(0);
      expect(component.find(EncodedKeystoneGeneratedView).length).toBe(0);
      expect(component.find('FailedToCreateView').length).toBe(0);
      expect(component.find(StepperStatusView).length).toBe(1);
    });
  });

  describe('stepper steps render', () => {
    let component;
    beforeEach(() => {
      component = mount(<PrerunCreator />);
    });

    it('step one EncodedPartyStep', () => {
      component.setState({
        loading: false,
        submissionAccepted: false,
        submitted: false,
        stepIndex: 0,
      });

      expect(component.find(StepperStepEP).length).toBe(1);
      expect(component.find(StepperStepConfirmParty).length).toBe(0);
      expect(component.find(StepperStepChooseDungeon).length).toBe(0);
    });

    it('step two ConfirmParty', () => {
      component.setState({
        loading: false,
        submissionAccepted: false,
        submitted: false,
        stepIndex: 1,
      });

      expect(component.find(StepperStepEP).length).toBe(0);
      expect(component.find(StepperStepConfirmParty).length).toBe(1);
      expect(component.find(StepperStepChooseDungeon).length).toBe(0);
    });

    it('step three Choose Dungeon', () => {
      component.setState({
        loading: false,
        submissionAccepted: false,
        submitted: false,
        stepIndex: 2,
        decodedParty: {
          keys: keystoneFixtures,
        },
      });

      expect(component.find(StepperStepEP).length).toBe(0);
      expect(component.find(StepperStepConfirmParty).length).toBe(0);
      expect(component.find(StepperStepChooseDungeon).length).toBe(1);
    });
  });
});
