import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DungeonRunPage from '../../src/containers/DungeonRunPage';
import BreakDownView from '../../src/components/run/breakdown-view';
import * as RunService from '../../src/services/retrieve-run-service';

configure({ adapter: new Adapter() });

fdescribe('CONTAINER: Dungeon Run Page', () => {
  let serviceSpy;
  let component;

  beforeEach(() => {
    spyOn(DungeonRunPage.prototype, 'componentWillMount');
    serviceSpy = spyOn(RunService, 'default').and.throwError('Run service should not be invoked');
    component = mount(<DungeonRunPage />);
  });

  describe('render states', () => {
    it('doesnt crash when no props are passed', () => {
      expect(component).toBeDefined();
      expect(serviceSpy).not.toHaveBeenCalled();
      expect(DungeonRunPage.prototype.componentWillMount)
        .toHaveBeenCalledTimes(1);
    });

    it('displays Spinner when loading', () => {
      component.setState({ loading: true });

      expect(component.find('AjaxSpinner').length).toBe(1);
      expect(component.find('#no-run-found').length).toBe(0);
      expect(component.find('BreakdownView').length).toBe(0);
      expect(component.find('#error-message').length).toBe(0);
      expect(component.find('#incomplete-run').length).toBe(0);
    });

    it('displays #no-run-found div when runrecord is und || null', () => {
      component.setState({ loading: false, runrecord: undefined, error: undefined });

      expect(component.find('AjaxSpinner').length).toBe(0);
      expect(component.find('#no-run-found').length).toBe(1);
      expect(component.find('BreakdownView').length).toBe(0);
      expect(component.find('#error-message').length).toBe(0);
      expect(component.find('#incomplete-run').length).toBe(0);
    });

    it('displays incomplete run when runrecord and !rundata', () => {
      component.setState({ loading: false, runrecord: {}, error: undefined });

      expect(component.find('AjaxSpinner').length).toBe(0);
      expect(component.find('#no-run-found').length).toBe(0);
      expect(component.find('BreakdownView').length).toBe(0);
      expect(component.find('#error-message').length).toBe(0);
      expect(component.find('#incomplete-run').length).toBe(1);
    });

    it('displays BreakdownView when rundata is defined', () => {
      component.setState({ loading: false, runrecord: {}, rundata: {}, error: undefined });

      expect(component.find('AjaxSpinner').length).toBe(0);
      expect(component.find('#no-run-found').length).toBe(0);
      expect(component.find(BreakDownView).length).toBe(1);
      expect(component.find('#error-message').length).toBe(0);
      expect(component.find('#incomplete-run').length).toBe(0);
    });

    it('displays ErrorMessage when error is defined', () => {
      component.setState({ loading: false, rundata: {}, error: 'a' });

      expect(component.find('AjaxSpinner').length).toBe(0);
      expect(component.find('#no-run-found').length).toBe(0);
      expect(component.find(BreakDownView).length).toBe(0);
      expect(component.find('#error-message').length).toBe(1);
      expect(component.find('#incomplete-run').length).toBe(0);
    });
  });
});
