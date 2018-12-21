import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BreakdownView from '../../../src/components/run/breakdown-view';
import validateRun, { runFixtures } from '../../../src/objects/run';
import RunEventChart from '../../../src/components/run/run-event-chart';
import KeystoneBannerView from '../../../src/components/key/banner-view';
import PartyBannerView from '../../../src/components/party/banner-view';
import MetaView from '../../../src/components/run/meta-view';

configure({ adapter: new Adapter() });

const KNOWN_DECODED_RUN = runFixtures[0];
const KNOWN_MALFORMED_RUN = JSON.parse('{"mal":"formed"}');

describe('COMPONENT: Run > Breakdown View', () => {
  describe('valid test setup', () => {
    it('has a valid run to mock', () => {
      expect(validateRun(KNOWN_DECODED_RUN)).toBeTruthy();
    });

    it('has an invalid run to mock', () => {
      expect(validateRun(KNOWN_MALFORMED_RUN)).toBeFalsy();
    });
  });

  describe('render states', () => {
    it('renders nothing if no rundata props is undefined', () => {
      const component = shallow(<BreakdownView />);

      expect(component.html()).toBeNull();
    });

    it('renders nothing if rundata is malformed', () => {
      const component = shallow(<BreakdownView rundata={KNOWN_MALFORMED_RUN} />);

      expect(component.html()).toBeNull();
    });

    it('renders somethign if rundata is valid', () => {
      const component = shallow(<BreakdownView rundata={KNOWN_DECODED_RUN} />);

      expect(component.html()).not.toBeNull();
    });
  });

  describe('elements rendered', () => {
    let component;
    beforeEach(() => {
      component = shallow(<BreakdownView rundata={KNOWN_DECODED_RUN} />);
    });

    it('draws a Run Event Chart', () => {
      expect(component.find(RunEventChart).length).toBe(1);
    });

    it('draws a player event summary', () => {
      expect(component.find('PlayerEventSummary').length).toBe(1);
    });

    it('draws a player event breakdown', () => {
      expect(component.find('PlayerEventBreakdown').length).toBe(1);
    });

    it('draws a boss encounter breakdown', () => {
      expect(component.find('BossEncounterBreakdown').length).toBe(1);
    });

    it('draws a keystone banner view', () => {
      expect(component.find(KeystoneBannerView).length).toBe(1);
    });

    it('draws a party banner view', () => {
      expect(component.find(PartyBannerView).length).toBe(1);
    });

    it('draws a run meta view', () => {
      expect(component.find(MetaView).length).toBe(1);
    });

    it('draws a run time summary view', () => {
      expect(component.find('TimeSummaryView').length).toBe(1);
    });

    it('draws a run time breakdown', () => {
      expect(component.find('TimeBreakdownView').length).toBe(1);
    });
  });
});
