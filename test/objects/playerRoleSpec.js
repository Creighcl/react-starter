import playerRole from '../../src/objects/playerRole';

describe('OBJECT: Player Role', () => {
  describe('enum nature', () => {
    it('gets by enum styled call', () => {
      expect(playerRole.TANK).toEqual(1);
    });

    it('has props by enum value', () => {
      expect(playerRole.properties[playerRole.TANK].name).toBe('Tank');
    });

    it('can get props if plain int is passed', () => {
      expect(playerRole.properties[1].name).toBe('Tank');
    });
  });

  describe('properties library', () => {
    it('has an entry count matching the prop count', () => {
      const enumEntryCount = Object.values(playerRole)
        .filter(r => typeof r === 'number').length;
      const propCount = Object.keys(playerRole.properties).length;

      expect(enumEntryCount).toEqual(propCount);
    });

    it('has a name attribute for each entry', () => {
      const entries = Object.values(playerRole.properties)
        .map(r => r.name);
      const numberOfEntriesWithoutName = entries
        .filter(r => r === undefined || typeof r !== 'string').length;

      expect(numberOfEntriesWithoutName).toBe(0);
    });
  });
});
