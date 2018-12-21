import { CURRENT_DIO_PROTOCOL_VERSION } from '../src/constants';

describe('CONSTANTS: App Constants', () => {
  it('has confirmed values', () => {
    expect(CURRENT_DIO_PROTOCOL_VERSION).toEqual('1.0.0');
  });
});
