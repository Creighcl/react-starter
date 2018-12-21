import { Base64 } from 'js-base64';
import { validEncryptedEncodedRunByVersion } from '../../../../src/fixtures/dioProtocolSpecs';
import { encodedRunTransformer100, encodedRunTransformer001 } from '../../../../src/utilities/dioProtocol/transformers/encodedRunTransformers';
import validateRun from '../../../../src/objects/run';
import { ERROR_MSG_NOT_TO_SPEC } from '../../../../src/utilities/dioProtocol/constants';

describe('PROTOCOL TRANSFORMER: Encoded Run', () => {
  describe('encodedRunTransformer100', () => {
    const goodShape = Base64.decode(validEncryptedEncodedRunByVersion['1.0.0']);
    const badPlayers = {
      ...goodShape,
      players: {
        0: {
          name: 'Lerianu',
        },
      },
    };
    const badKey = {
      ...goodShape,
      keystone: {
        dungeon: 'Atal\'Dazar',
      },
    };
    it('transforms to-spec value into accepted shape', () => {
      const party = encodedRunTransformer100(JSON.parse(goodShape));

      expect(validateRun(party)).toBeTruthy();
    });

    it('throws if value not to spec', () => {
      try {
        encodedRunTransformer100(badPlayers);
        fail('should have failed');
      } catch (e) {
        expect(e.message).toEqual(ERROR_MSG_NOT_TO_SPEC);
      }
    });

    it('throws if value not to spec2', () => {
      try {
        encodedRunTransformer100(badKey);
        fail('should have failed');
      } catch (e) {
        expect(e.message).toEqual(ERROR_MSG_NOT_TO_SPEC);
      }
    });
  });

  describe('encodedPartyTransformer001', () => {
    const goodShape = validEncryptedEncodedRunByVersion['0.0.1'];
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
      const run = encodedRunTransformer001(JSON.parse(goodShape));

      expect(validateRun(run)).toBeTruthy();
    });

    it('001 throws if value not to spec', () => {
      try {
        encodedRunTransformer001(badPlayers);
        fail('should have failed');
      } catch (e) {
        expect(e.message).toEqual(ERROR_MSG_NOT_TO_SPEC);
      }
    });

    it('001 throws if value not to spec2', () => {
      try {
        encodedRunTransformer001(badKeys);
        fail('should have failed');
      } catch (e) {
        expect(e.message).toEqual(ERROR_MSG_NOT_TO_SPEC);
      }
    });
  });
});
