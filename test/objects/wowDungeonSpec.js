import wowDungeon from '../../src/objects/wowDungeon';

describe('OBJECT: WoW Dungeon', () => {
  describe('enum nature', () => {
    it('gets by enum styled call', () => {
      expect(wowDungeon.TOLDAGOR).toEqual(246);
    });

    it('has a properties attribute with props by enum value', () => {
      expect(wowDungeon.properties[wowDungeon.TOLDAGOR].name).toEqual('Tol Dagor');
    });

    it('can get props if plain int is passed', () => {
      expect(wowDungeon.properties[246].name).toEqual('Tol Dagor');
    });
  });

  describe('properties library', () => {
    it('has an entry count matching the prop count', () => {
      const enumEntries = Object.values(wowDungeon)
        .filter(v => typeof v === 'number').length;
      const propEntries = Object.keys(wowDungeon.properties).length;

      expect(enumEntries).toEqual(propEntries);
    });

    it('has a name attribute for each entry', () => {
      const entries = Object.values(wowDungeon.properties)
        .map(d => d.name);
      const numberOfEntriesWithoutName = entries.filter(d => (d === undefined)
      || typeof d !== 'string').length;

      expect(numberOfEntriesWithoutName).toBe(0);
    });

    it('has a shortName attribute for each entry', () => {
      const entries = Object.values(wowDungeon.properties)
        .map(d => d.shortName);
      const numberOfEntriesWithoutShortName = entries.filter(d => (d === undefined)
      || typeof d !== 'string').length;

      expect(numberOfEntriesWithoutShortName).toBe(0);
    });

    it('has an expansion attribute for each entry', () => {
      const entries = Object.values(wowDungeon.properties)
        .map(d => d.expansion);
      const numberOfEntriesWithoutExpansion = entries.filter(d => (d === undefined)
      || typeof d !== 'string').length;

      expect(numberOfEntriesWithoutExpansion).toBe(0);
    });

    it('has a secGoals array on each entry', () => {
      const entries = Object.values(wowDungeon.properties)
        .map(d => d.secGoals);
      const numberOfEntriesWithoutGoals = entries.filter(d => (d === undefined)
      || !Array.isArray(d)).length;

      expect(numberOfEntriesWithoutGoals).toBe(0);
    });
  });

  describe('byExpansion() method', () => {
    it('exists and returns a value', () => {
      expect(wowDungeon.byExpansion()).toBeDefined();
    });

    it('returns an object', () => {
      expect(typeof wowDungeon.byExpansion()).toBe('object');
    });

    it('returns an array of dungeonids as numbers organized by expansion', () => {
      const dunByExp = wowDungeon.byExpansion();
      const uniqueExpansionSet = new Set(Object.values(wowDungeon.properties)
        .map(d => d.expansion));
      const expArr = Array.from(uniqueExpansionSet);
      expArr.forEach((expansion) => {
        expect(dunByExp[expansion]).toBeDefined();
        expect(Array.isArray(dunByExp[expansion])).toBe(true);
      });
    });

    it('has only items matching expansion of key', () => {
      const dunByExp = wowDungeon.byExpansion();
      const uniqueExpansionSet = new Set(Object.values(wowDungeon.properties)
        .map(d => d.expansion));
      const expArr = Array.from(uniqueExpansionSet);
      expArr.forEach((expansion) => {
        const mismatchCount = dunByExp[expansion]
          .filter(d => wowDungeon.properties[d].expansion !== expansion).length;

        expect(mismatchCount).toBe(0);
      });
    });
  });
});
