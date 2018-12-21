import { Base64 } from 'js-base64';
import encodeKeystone, {
  obfuscateEncodedKeystone,
  lookupKeystoneTransformer,
} from '../../../src/utilities/dioProtocol/encodeKeystone';
import {
  ERROR_MSG_BAD_PARAM,
  ERROR_MSG_DEPRECATED_VERSION,
  ERROR_MSG_UNSUPPORTED_VERSION,
} from '../../../src/utilities/dioProtocol/constants';

const dioProtocolWithAKeyTransformer = '0.0.1';
const dioProtocolWithoutAKeyTransfomer = '0.0.0';

describe('UTILITY: DioProtocol EncodeKeystone', () => {
  describe('encodeKeystone', () => {
    it('returns a promise', () => {
      expect(encodeKeystone().then).toBeDefined();
    });
  });

  describe('lookupKeystoneTransformer', () => {
    it('rejects when passed a value that is not a version', () => {
      lookupKeystoneTransformer()
        .then(() => fail('should have rejected'))
        .catch((e) => {
          expect(e.message).toEqual(ERROR_MSG_UNSUPPORTED_VERSION);
        });
    });

    it('rejects when a version is provided that doesnt have a transformer', () => {
      lookupKeystoneTransformer(dioProtocolWithoutAKeyTransfomer)
        .then(() => fail('should have rejected'))
        .catch((e) => {
          expect(e.message).toEqual(ERROR_MSG_DEPRECATED_VERSION);
        });
    });

    it('resolves when version provided with a transformer', () => {
      lookupKeystoneTransformer(dioProtocolWithAKeyTransformer)
        .then((transformer) => {
          expect(transformer).toBeDefined();
          expect(typeof transformer).toEqual('function');
        })
        .catch((e) => {
          fail(e);
        });
    });
  });

  describe('obfuscateEncodedKeystone', () => {
    it('errors for bad param if no string input', () => {
      try {
        obfuscateEncodedKeystone();
      } catch (e) {
        expect(e.message).toBe(ERROR_MSG_BAD_PARAM);
      }
    });

    it('succeeds when a string is passed', () => {
      const aString = 'aString';
      const base64Version = Base64.encode(aString);
      try {
        const obfuscated = obfuscateEncodedKeystone(aString);

        expect(obfuscated).toEqual(base64Version);
      } catch (e) {
        fail('should not have errored');
      }
    });
  });
});
