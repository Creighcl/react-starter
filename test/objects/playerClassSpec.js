import playerClass from '../../src/objects/playerClass';

describe('OBJECT: Player Class', () => {
  describe('enum nature', () => {
    it('gets by enum styled call', () => {
      expect(playerClass.WARRIOR).toBe(1);
    });

    it('has props attribute by enum value', () => {
      expect(playerClass.properties[playerClass.WARRIOR].name).toBe('Warrior');
    });

    it('can get props if plain int is passed', () => {
      expect(playerClass.properties[1].name).toBe('Warrior');
    });
  });

  describe('properties library', () => {
    it('has an entry count matching the prop count', () => {
      const enumEntries = Object.values(playerClass)
        .filter(c => typeof c === 'number').length;
      const propEntries = Object.keys(playerClass.properties).length;

      expect(enumEntries).toEqual(propEntries);
    });

    it('has a name attribute for each entry', () => {
      const entries = Object.values(playerClass.properties)
        .map(c => c.name);
      const numberOfEntriesWithoutName = entries
        .filter(c => c === undefined || typeof c !== 'string').length;

      expect(numberOfEntriesWithoutName).toBe(0);
    });

    it('has a shortName attribute for each', () => {
      const entries = Object.values(playerClass.properties)
        .map(c => c.shortName);
      const numberOfEntriesWithoutShortName = entries
        .filter(c => c === undefined || typeof c !== 'string').length;

      expect(numberOfEntriesWithoutShortName).toBe(0);
    });

    it('has a color attribute for each', () => {
      const entries = Object.values(playerClass.properties)
        .map(c => c.color);
      const numberOfEntriesWithoutColor = entries
        .filter(c => c === undefined || typeof c !== 'string').length;

      expect(numberOfEntriesWithoutColor).toBe(0);
    });

    it('has a roles array for each', () => {
      const entries = Object.values(playerClass.properties)
        .map(c => c.roles);
      const numberOfEntriesWithoutRoles = entries
        .filter(c => c === undefined || !Array.isArray(c)).length;

      expect(numberOfEntriesWithoutRoles).toBe(0);
    });
  });
});
