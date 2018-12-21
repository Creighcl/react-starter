import keystoneDifficulty from '../../src/objects/keystoneDifficulty';

describe('OBJECT: Keystone Difficulty', () => {
  it('has 24 entries, level 2-25', () => {
    expect(Object.keys(keystoneDifficulty).length).toBe(24);
  });

  describe('all difficulty entries', () => {
    let entries;

    beforeEach(() => {
      entries = Object.values(keystoneDifficulty);
    });

    it('is callable by difficulty level in braces', () => {
      expect(keystoneDifficulty[2]).toBeDefined();
      expect(keystoneDifficulty[2].affixCount).toBe(1);
    });

    it('have number affixCount property', () => {
      const countMissingProperty = entries
        .filter(d => d.affixCount === undefined
          || typeof d.affixCount !== 'number')
        .length;

      expect(countMissingProperty).toBe(0);
    });

    it('have number iLevelLoot property', () => {
      const countMissingProperty = entries
        .filter(d => d.iLevelLoot === undefined
          || typeof d.iLevelLoot !== 'number')
        .length;

      expect(countMissingProperty).toBe(0);
    });

    it('have number iLevelWeekly property', () => {
      const countMissingProperty = entries
        .filter(d => d.iLevelWeekly === undefined
          || typeof d.iLevelWeekly !== 'number')
        .length;

      expect(countMissingProperty).toBe(0);
    });

    it('have number iLevelAzerite property', () => {
      const countMissingProperty = entries
        .filter(d => d.iLevelAzerite === undefined
          || typeof d.iLevelAzerite !== 'number')
        .length;

      expect(countMissingProperty).toBe(0);
    });
  });
});
