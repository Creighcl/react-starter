import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import SideMenuC, { SideMenu } from '../../../src/components/site-layout/SideMenu';

configure({ adapter: new Adapter() });

const history = createHistory();

describe('COMPONENT: SideMenu', () => {
  describe('default render', () => {
    it('deep renders within a router', () => {
      const component = mount(<Router history={history}><SideMenuC /></Router>);

      expect(component).toBeDefined();
    });

    it('shallow renders alone', () => {
      const component = shallow(<SideMenu />);

      expect(component).toBeDefined();
    });
  });
});
