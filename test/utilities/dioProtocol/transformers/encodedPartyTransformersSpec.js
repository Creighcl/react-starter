import { Base64 } from 'js-base64';
import { validEncryptedEncodedPartyByVersion } from '../../../../src/fixtures/dioProtocolSpecs';
import { encodedPartyTransformer100, encodedPartyTransformer001 } from '../../../../src/utilities/dioProtocol/transformers/encodedPartyTransformers';
import { validateParty } from '../../../../src/fixtures/parties';
import { ERROR_MSG_NOT_TO_SPEC } from '../../../../src/utilities/dioProtocol/constants';

describe('PROTOCOL TRANSFORMER: Encoded Party', () => {
  describe('encodedPartyTransformer100', () => {
    const goodShape = Base64.decode(validEncryptedEncodedPartyByVersion['1.0.0']);
    const badPlayers = {
      ...goodShape,
      players: {
        0: {
          name: 'Lerianu',
        },
      },
    };
    const badKeys = {
      ...goodShape,
      keys: {
        dungeon: 'Atal\'Dazar',
      },
    };
    it('transforms to-spec value into accepted shape', () => {
      const party = encodedPartyTransformer100(JSON.parse(goodShape));

      expect(validateParty(party)).toBeTruthy();
    });

    it('throws if value not to spec', () => {
      try {
        encodedPartyTransformer100(badPlayers);
        fail('should have failed');
      } catch (e) {
        expect(e.message).toEqual(ERROR_MSG_NOT_TO_SPEC);
      }
    });

    it('throws if value not to spec2', () => {
      try {
        encodedPartyTransformer100(badKeys);
        fail('should have failed');
      } catch (e) {
        expect(e.message).toEqual(ERROR_MSG_NOT_TO_SPEC);
      }
    });
  });

  describe('encodedPartyTransformer001', () => {
    const goodShape = Base64.decode(validEncryptedEncodedPartyByVersion['0.0.1']);
    const badPlayers = {
      ...goodShape,
      players: {
        0: {
          name: 'Lerianu',
        },
      },
    };
    const badKeys = {
      ...goodShape,
      keys: {
        dungeon: 'Atal\'Dazar',
      },
    };
    it('001 transforms to-spec value into accepted shape', () => {
      const party = encodedPartyTransformer001(JSON.parse(goodShape));

      expect(validateParty(party)).toBeTruthy();
    });

    it('001 throws if value not to spec', () => {
      try {
        encodedPartyTransformer001(badPlayers);
        fail('should have failed');
      } catch (e) {
        expect(e.message).toEqual(ERROR_MSG_NOT_TO_SPEC);
      }
    });

    it('001 throws if value not to spec2', () => {
      try {
        encodedPartyTransformer001(badKeys);
        fail('should have failed');
      } catch (e) {
        expect(e.message).toEqual(ERROR_MSG_NOT_TO_SPEC);
      }
    });
  });
});
