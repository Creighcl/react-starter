import WowDungeonBoss from '../../src/objects/wowDungeonBoss';

const KNOWN_ENUM_ENTRY_PROP = 'name';
const KNOWN_ENUM_ENTRY_PROP_VAL = 'Harlan Sweete';
const KNOWN_ENUM_ENTRY_ID = 129440;
const KNOWN_ENUM_ENTRY_ALIAS = 'HARLANSWEETE';


describe('OBJECT: Wow Dungeon Boss', () => {
  describe('enum nature', () => {
    it('can call value by ENUM style', () => {
      expect(WowDungeonBoss
        .properties[WowDungeonBoss[KNOWN_ENUM_ENTRY_ALIAS]][KNOWN_ENUM_ENTRY_PROP])
        .toBe(KNOWN_ENUM_ENTRY_PROP_VAL);
    });

    it('can call value by NUMBER', () => {
      expect(WowDungeonBoss
        .properties[KNOWN_ENUM_ENTRY_ID][KNOWN_ENUM_ENTRY_PROP])
        .toBe(KNOWN_ENUM_ENTRY_PROP_VAL);
    });
  });

  describe('properties object', () => {
    it('missing zero prop entries to match enum entries', () => {
      const enumEntryKeys = Object.values(WowDungeonBoss)
        .filter(v => typeof v === 'number')
        .map(v => `${v}`);
      const entryKeysMissingPropEntry = Object.keys(WowDungeonBoss.properties)
        .filter(k => !enumEntryKeys.includes(k));

      expect(entryKeysMissingPropEntry.length).toBe(0);
    });

    it('has a NAME value on each entry', () => {
      const propVals = Object.values(WowDungeonBoss.properties);
      const countMissingNameAsString = propVals.filter(v => typeof v.name !== 'string').length;

      expect(countMissingNameAsString).toBe(0);
    });
  });
});
