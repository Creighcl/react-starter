import { Base64 } from 'js-base64';
import { revealEncodedParty, lookupEncodedPartyTransformer, toParty } from '../../../src/utilities/dioProtocol/encodedParty';
import dioProtocols from '../../../src/objects/dioProtocols';
import { validEncryptedEncodedPartyByVersion } from '../../../src/fixtures/dioProtocolSpecs';
import { playerValidation } from '../../../src/objects/player';
import { isValidKeystone } from '../../../src/fixtures/keys';
import protocolSupportTypes from '../../../src/objects/dioProtocolSupportType';

import {
  ERROR_MSG_UNSUPPORTED_VERSION,
  ERROR_MSG_BAD_PARAM,
  ERROR_MSG_DEPRECATED_VERSION,
  ERROR_MSG_INVALID_EP,
  ERROR_MSG_NO_SPEC_LISTED,
} from '../../../src/utilities/dioProtocol/constants';

const dioProtocolWithAPartyTransformer = '0.0.1';
const dioProtocolWithoutAPartyTransfomer = '0.0.0';

describe('UTILITY: Encoded Party', () => {
  describe('toParty method', () => {
    Object.values(dioProtocols)
      .filter(p => p.supportLevel !== protocolSupportTypes.DEPRECATED)
      .forEach((version) => {
        const versionNumber = version.dioprotocol;
        it(`VERSION ${versionNumber}: fixture transforms to valid party`, () => {
          const validFixtureForVersion = validEncryptedEncodedPartyByVersion[versionNumber];
          if (!validFixtureForVersion) {
            fail(`no fixture defined for version ${versionNumber}`);
          }
          toParty(validFixtureForVersion)
            .then((party) => {
              expect(Array.isArray(party.players)).toBeTruthy();
              const notPlayerShapeCount = party.players.filter(p => !playerValidation(p)).length;

              expect(notPlayerShapeCount).toBe(0);
              expect(Array.isArray(party.keys)).toBeTruthy();
              const notKeyShapeCount = party.keys.filter(k => !isValidKeystone(k)).length;

              expect(notKeyShapeCount).toBe(0);
            })
            .catch(e => fail(`processing failed on version ${versionNumber}, errorcode ${e.message}`));
        });
      });
  });

  describe('lookupEncodedPartyTransformer', () => {
    it('rejects when passed a value that is not a version', () => {
      lookupEncodedPartyTransformer()
        .then(() => fail('should have rejected'))
        .catch((e) => {
          expect(e.message).toEqual(ERROR_MSG_UNSUPPORTED_VERSION);
        });
    });

    it('rejects when a version is provided that doesnt have a transformer', () => {
      lookupEncodedPartyTransformer(dioProtocolWithoutAPartyTransfomer)
        .then(() => fail('should have rejected'))
        .catch((e) => {
          expect(e.message).toEqual(ERROR_MSG_DEPRECATED_VERSION);
        });
    });

    it('resolves when version provided with a transformer', () => {
      lookupEncodedPartyTransformer(dioProtocolWithAPartyTransformer)
        .then((transformer) => {
          expect(transformer).toBeDefined();
          expect(typeof transformer).toEqual('function');
        })
        .catch((e) => {
          fail(e);
        });
    });
  });

  describe('revealEncodedParty()', () => {
    const encodedNonJSON = Base64.encode('Chris is the best ever');
    const encodedJSONNoDioProtocol = Base64.encode('{"someObj":"someValue"}');
    const validObfuscatedEncodedParty = Base64.encode('{"dioprotocol":"1.0.0"}');
    it('returns a promise', () => {
      expect(revealEncodedParty().then).toBeDefined();
    });

    it('throws error for INVALID PARAMETER if not a string', () => {
      revealEncodedParty()
        .then(() => fail('error not thrown'))
        .catch((e) => {
          expect(e.message).toEqual(ERROR_MSG_BAD_PARAM);
        });
    });

    it('throws if b64 decode is not JSON parsable', () => {
      revealEncodedParty(encodedNonJSON)
        .then(() => fail('error not thrown'))
        .catch((e) => {
          expect(e.message).toEqual(ERROR_MSG_INVALID_EP);
        });
    });

    it('throws if parsed JSON does not have dioprotocol prop', () => {
      revealEncodedParty(encodedJSONNoDioProtocol)
        .then(() => fail('error not thrown'))
        .catch((e) => {
          expect(e.message).toEqual(ERROR_MSG_NO_SPEC_LISTED);
        });
    });

    it('returns an object when valid obfuscated ep JSON string passed', () => {
      revealEncodedParty(validObfuscatedEncodedParty)
        .then((revealedEP) => {
          expect(typeof revealedEP).toBe('object');
          expect(typeof revealedEP.encodedParty).toBe('string');
          expect(typeof revealedEP.encodedPartyPojo).toBe('object');
          expect(typeof revealedEP.encodedPartyPojo.dioprotocol).toBe('string');
        })
        .catch(() => fail('valid obfuscated encoded party is apparently not a valid test constant'));
    });
  });
});
