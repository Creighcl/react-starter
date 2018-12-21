import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeprecationNoticeView from '../../../src/components/dioprotocol/deprecation-notice-view';
import {
  ERROR_MSG_UNSUPPORTED_VERSION,
  ERROR_MSG_DEPRECATED_VERSION,
  ERROR_MSG_DEPRECATION_WARNING,
} from '../../../src/utilities/dioProtocol/constants';
import DioProtocols from '../../../src/objects/dioProtocols';
import SupportType from '../../../src/objects/dioProtocolSupportType';

configure({ adapter: new Adapter() });

const KNOWN_DEPRECATED_VERSION = '0.0.0';
const KNOWN_INVALID_VERSION = '0.5.0';
const KNOWN_DEPRECATION_WARNING_VERSION = '0.0.1';
const KNOWN_SUPPORTED_VERSION = '1.0.0';

describe('COMPONENT: Dioprotocol Deprecation Notice View', () => {
  describe('test variables', () => {
    it('is using an actual deprecated version', () => {
      expect(DioProtocols[KNOWN_DEPRECATED_VERSION].supportLevel)
        .toBe(SupportType.DEPRECATED);
    });

    it('is using an actual invalid version', () => {
      expect(DioProtocols[KNOWN_INVALID_VERSION])
        .not.toBeDefined();
    });

    it('is using an actual deprecating soon version', () => {
      expect(DioProtocols[KNOWN_DEPRECATION_WARNING_VERSION].supportLevel)
        .toBe(SupportType.DEPRECATION_WARNING);
    });

    it('is using an actual supported version', () => {
      expect(DioProtocols[KNOWN_SUPPORTED_VERSION].supportLevel)
        .toBe(SupportType.SUPPORTED);
    });
  });

  describe('render states', () => {
    it('is renderable', () => {
      const component = mount(<DeprecationNoticeView dioprotocol="1.0.0" />);

      expect(component).toBeDefined();
    });

    it('renders nothing if props.dioprotocol is undefined', () => {
      const component = mount(<DeprecationNoticeView />);

      expect(component.html()).toEqual(null);
    });

    it('renders nothing if props.dioprotocol is supported', () => {
      const component = mount(<DeprecationNoticeView dioprotocol={KNOWN_SUPPORTED_VERSION} />);

      expect(component.html()).toEqual(null);
    });

    it('renders warning if dioprotocol is deprecating', () => {
      const component = mount(<DeprecationNoticeView
        dioprotocol={KNOWN_DEPRECATION_WARNING_VERSION}
      />);

      expect(component.text()).toEqual(ERROR_MSG_DEPRECATION_WARNING);
    });

    it('renders warning if dioprotocol is deprecated', () => {
      const component = mount(<DeprecationNoticeView
        dioprotocol={KNOWN_DEPRECATED_VERSION}
      />);

      expect(component.text()).toEqual(ERROR_MSG_DEPRECATED_VERSION);
    });

    it('renders warning if dioprotocol is invalid', () => {
      const component = mount(<DeprecationNoticeView
        dioprotocol={KNOWN_INVALID_VERSION}
      />);

      expect(component.text()).toEqual(ERROR_MSG_UNSUPPORTED_VERSION);
    });
  });
});
