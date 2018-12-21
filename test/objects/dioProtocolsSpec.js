import dioProtocols from '../../src/objects/dioProtocols';
import { validEncryptedEncodedPartyByVersion } from '../../src/fixtures/dioProtocolSpecs';

const supportedProtocols = Object.values(dioProtocols).filter(p => p.supportLevel > 0);

describe('OBJECT: DioProtocols', () => {
  describe('mapping nature, each object', () => {
    it('has a dioprotocol prop of type string', () => {
      const missingPropCount = supportedProtocols
        .map(p => typeof p.dioprotocol !== 'string').length;

      expect(missingPropCount).toEqual(supportedProtocols.length);
    });

    it('has a supportLevel prop of type number', () => {
      const missingPropCount = supportedProtocols
        .map(p => typeof p.supportLevel !== 'number').length;

      expect(missingPropCount).toEqual(supportedProtocols.length);
    });

    it('has a encodedPartyTransformer obj', () => {
      const missingPropCount = supportedProtocols
        .map(p => typeof p.encodedPartyTransformer !== 'object').length;

      expect(missingPropCount).toEqual(supportedProtocols.length);
    });

    it('has a sample fixture provided for validEncryptedEncodedParty', () => {
      const missingFixtureEntry = supportedProtocols
        .map(p => !validEncryptedEncodedPartyByVersion[p.dioprotocol])
        .length;

      expect(missingFixtureEntry).toEqual(supportedProtocols.length);
    });
  });
});
