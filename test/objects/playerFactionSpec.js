import playerFaction from '../../src/objects/playerFaction';

describe('OBJECT: Player Faction', () => {
  describe('enum architecture', () => {
    it('can use enum name to id', () => {
      expect(playerFaction.ALLIANCE).toBe(1);
    });

    it('has props by enum value', () => {
      expect(playerFaction.properties[playerFaction.ALLIANCE].name).toBe('Alliance');
    });

    it('can get props if plain int is passed', () => {
      expect(playerFaction.properties[1].name).toBe('Alliance');
    });
  });

  describe('properties library', () => {
    it('has an entry for each enum value', () => {
      const enumValueCount = Object.values(playerFaction)
        .filter(v => typeof v === 'number').length;
      const entryCount = Object.keys(playerFaction.properties).length;

      expect(enumValueCount).toBe(entryCount);
    });

    it('has a value for name on each entry', () => {
      const entries = Object.values(playerFaction.properties);
      const countWithNoName = entries
        .filter(e => e.name === undefined || typeof e.name !== 'string').length;

      expect(countWithNoName).toBe(0);
    });
  });
});
