import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GeneratedView,
{ KEYSTONE_DIV_CONTAINER, MESSAGE_EK_GENERATED }
  from '../../../src/components/encoded-keystone/generated-view';

configure({ adapter: new Adapter() });

describe('COMPONENT: Encoded Keystone > Generated View', () => {
  it('constants', () => {
    expect(KEYSTONE_DIV_CONTAINER).toBe('EncodedKeystoneText');
    expect(MESSAGE_EK_GENERATED).toBe('You&apos;ve setup your run! Here is your encoded keystone:');
  });

  describe('renders', () => {
    it('nothing when no props.encodedKeystone is provided', () => {
      const component = mount(<GeneratedView />);

      expect(component.find(`.${KEYSTONE_DIV_CONTAINER}`).length).toBe(0);
    });

    it('a div container if keystone provided', () => {
      const component = mount(<GeneratedView encodedKeystone="KEYSTONETEXT" />);

      expect(component.find(`.${KEYSTONE_DIV_CONTAINER}`).length).toBe(1);
    });
  });
});
