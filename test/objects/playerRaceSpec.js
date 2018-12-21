import playerRace from '../../src/objects/playerRace';
import playerFaction from '../../src/objects/playerFaction';

describe('OBJECT: Player Race', () => {
  describe('enum architecture', () => {
    it('can use enum name to id', () => {
      expect(playerRace.GNOME).toBe(7);
    });

    it('has props by enum value', () => {
      expect(playerRace.properties[playerRace.GNOME].name).toBe('Gnome');
    });

    it('can get props if plain int is passed', () => {
      expect(playerRace.properties[7].name).toBe('Gnome');
    });
  });

  describe('properties library', () => {
    it('has an entry for each enum value', () => {
      const enumValueCount = Object.values(playerRace)
        .filter(v => typeof v === 'number').length;
      const entryCount = Object.keys(playerRace.properties).length;

      expect(enumValueCount).toBe(entryCount);
    });

    it('has a value for name on each entry', () => {
      const entries = Object.values(playerRace.properties);
      const countWithNoName = entries
        .filter(e => e.name === undefined || typeof e.name !== 'string').length;

      expect(countWithNoName).toBe(0);
    });

    it('has an array for factions on each entry', () => {
      const entries = Object.values(playerRace.properties);
      const countWithNoFactions = entries
        .filter(e => e.factions === undefined || !Array.isArray(e.factions)).length;

      expect(countWithNoFactions).toBe(0);
    });
  });

  describe('byFaction() method', () => {
    let byFaction;

    beforeEach(() => {
      byFaction = playerRace.byFaction();
    });

    it('exists and returns an object', () => {
      expect(byFaction).toBeDefined();
      expect(typeof byFaction).toBe('object');
    });

    it('has an array property for each unique faction', () => {
      const factionIds = Object.keys(playerFaction.properties);
      factionIds.forEach((i) => {
        expect(byFaction[i]).toBeDefined();
        expect(Array.isArray(byFaction[i])).toBeTruthy();
      });
    });

    it('returns numbers in arrays', () => {
      const arr = byFaction[playerFaction.ALLIANCE];
      const numberOfNonNumbers = arr.filter(f => typeof f !== 'number').length;

      expect(numberOfNonNumbers).toBe(0);
    });
  });
});
