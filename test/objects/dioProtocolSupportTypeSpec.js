import protocolSupportType from '../../src/objects/dioProtocolSupportType';

describe('UTILITY ENUM: Protocol Support Type', () => {
  describe('enum behavior', () => {
    it('can get a type by enum call', () => {
      expect(protocolSupportType.SUPPORTED).toEqual(1);
    });

    it('can get props by int', () => {
      expect(protocolSupportType.properties[1].name).toEqual('Supported');
    });

    it('can get props by enum', () => {
      expect(protocolSupportType.properties[protocolSupportType.SUPPORTED].name).toEqual('Supported');
    });
  });

  describe('properties obj', () => {
    it('has equal entry count as enum entries', () => {
      const enumEntryCount = Object.values(protocolSupportType)
        .filter(e => typeof e === 'number').length;
      const propEntryCount = Object.values(protocolSupportType.properties)
        .length;

      expect(enumEntryCount).toEqual(propEntryCount);
    });

    it('has name on each entry', () => {
      const missingNameCount = Object.values(protocolSupportType.properties)
        .filter(t => typeof t.name !== 'string').length;

      expect(missingNameCount).toEqual(0);
    });

    it('has description on each entry', () => {
      const missingDescCount = Object.values(protocolSupportType.properties)
        .filter(t => typeof t.description !== 'string').length;

      expect(missingDescCount).toEqual(0);
    });
  });
});
