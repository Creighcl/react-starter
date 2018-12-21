import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AjaxSpinner from '../../src/components/ajax-spinner';

configure({ adapter: new Adapter() });

describe('COMPONENT: Ajax Spinner', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AjaxSpinner />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
