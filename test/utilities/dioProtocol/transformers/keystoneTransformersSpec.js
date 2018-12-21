import {
  keystoneTransformer001,
  keystoneTransformer100,
} from '../../../../src/utilities/dioProtocol/transformers/keystoneTransformers';
import { ERROR_MSG_BAD_PARAM } from '../../../../src/utilities/dioProtocol/constants';

const validParameter = {
  players: [{ name: 'a', server: 'b' }],
  runid: 'a',
  opponentEncodedRun: 'a',
  selectedKeystone: {
    dungeon: 1,
    difficulty: 1,
    affixes: [1, 2],
  },
  expires: 1,
  selectedMode: 1,
  dioprotocol: '0.0.1',
};

describe('UTILITY: Dio Protocol Transformer: Keystone Encoder', () => {
  describe('keystoneTransformer001', () => {
    it('throws if a parameter is missing', () => {
      expect(() => keystoneTransformer001({ ...validParameter, players: undefined }))
        .toThrow(new Error(ERROR_MSG_BAD_PARAM));

      expect(() => keystoneTransformer001({ ...validParameter, expires: undefined }))
        .toThrow(new Error(ERROR_MSG_BAD_PARAM));
    });

    it('returns a JSON parsable string when all params passed', () => {
      const stringResult = keystoneTransformer001(validParameter);

      expect(typeof stringResult).toEqual('string');
      expect(typeof JSON.parse(stringResult)).toEqual('object');
    });
  });

  describe('keystoneTransformer100', () => {
    it('100 throws if param is missing', () => {
      expect(() => keystoneTransformer100({ ...validParameter, players: undefined }))
        .toThrow(new Error(ERROR_MSG_BAD_PARAM));

      expect(() => keystoneTransformer100({ ...validParameter, expires: undefined }))
        .toThrow(new Error(ERROR_MSG_BAD_PARAM));
    });

    it('100 returns a JSON parsable string when all params passed', () => {
      const stringResult = keystoneTransformer100(validParameter);

      expect(typeof stringResult).toEqual('string');
      expect(typeof JSON.parse(stringResult)).toEqual('object');
    });
  });
});
