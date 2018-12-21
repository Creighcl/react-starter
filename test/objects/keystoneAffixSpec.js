import KeystoneAffix, { affixTierDefaults } from '../../src/objects/keystoneAffix';

describe('OBJECT: Keystone Affix', () => {
  describe('enum nature', () => {
    it('gets by enum styled call', () => {
      expect(KeystoneAffix.SKITTISH).toEqual(2);
    });

    it('has a method to get properties by enum call', () => {
      const affixProps = KeystoneAffix.properties[KeystoneAffix.SKITTISH];

      expect(affixProps).toBeDefined();
      expect(affixProps.name).toBeDefined();
      expect(affixProps.shortName).toBeDefined();
      expect(affixProps.difficulty).toBeDefined();
    });

    it('also gets props if plain int passed', () => {
      const keyAffix = 2;
      const affixProps = KeystoneAffix.properties[keyAffix];

      expect(affixProps).toBeDefined();
      expect(affixProps.name).toBeDefined();
      expect(affixProps.shortName).toBeDefined();
      expect(affixProps.difficulty).toBeDefined();
    });
  });

  describe('properties library', () => {
    it('has an entry for each enum listed', () => {
      const entryList = Object.values(KeystoneAffix).filter(o => typeof o === 'number');
      const mappedValues = entryList.map(e => KeystoneAffix.properties[e]);
      const numberOfMissingEntries = mappedValues.filter(m => m === undefined).length;

      expect(numberOfMissingEntries).toBe(0);
      expect(entryList.length).toEqual(Object.values(KeystoneAffix.properties).length);
    });

    it('has a name attribute for each entry', () => {
      const entries = Object.values(KeystoneAffix.properties).map(p => p.name);
      const numberOfEntriesWithoutStringName = entries
        .filter(e => e === undefined || typeof e !== 'string').length;

      expect(numberOfEntriesWithoutStringName).toBe(0);
    });

    it('has a shortName attribute for each entry', () => {
      const entries = Object.values(KeystoneAffix.properties).map(p => p.shortName);
      const numberOfEntriesWithoutStringShortName = entries
        .filter(e => e === undefined || typeof e !== 'string').length;

      expect(numberOfEntriesWithoutStringShortName).toBe(0);
    });

    it('has a difficulty attribute for each entry', () => {
      const entries = Object.values(KeystoneAffix.properties).map(p => p.difficulty);
      const numberOfEntriesWithoutDiffInt = entries
        .filter(e => e === undefined || typeof e !== 'number').length;

      expect(numberOfEntriesWithoutDiffInt).toBe(0);
    });
  });

  describe('byDifficulty() method', () => {
    let byDif;

    beforeEach(() => {
      byDif = KeystoneAffix.byDifficulty();
    });

    it('exists and returns a value', () => {
      expect(byDif).toBeDefined();
    });

    it('returns an object', () => {
      expect(typeof byDif).toEqual('object');
    });

    it('returns an array of affix ids as numbers where props = difficulty', () => {
      const VALID_DIFFICULTY_LEVEL = 2;
      const difficultyArr = byDif[VALID_DIFFICULTY_LEVEL];
      const countOfNumbers = difficultyArr
        .filter(a => typeof a === 'number').length;

      expect(countOfNumbers).toEqual(difficultyArr.length);
      expect(Array.isArray(difficultyArr)).toBe(true);
    });

    it('arrays have all props matching the difficulty', () => {
      const difficultyLevels = new Set(Object.values(KeystoneAffix.properties)
        .map(a => a.difficulty));
      difficultyLevels.forEach((difficulty) => {
        const difficultyArr = byDif[difficulty];
        const actualPropArr = difficultyArr.map(a => KeystoneAffix.properties[a]);
        const propsMatchingDifLevel = actualPropArr
          .filter(a => a.difficulty === difficulty).length;
        const countOfPropsMatching = Object.values(KeystoneAffix.properties)
          .filter(o => o.difficulty === difficulty).length;
        const areInts = Array.from(difficultyLevels)
          .filter(d => typeof d === 'number').length;

        expect(areInts).toEqual(Array.from(difficultyLevels).length);
        expect(propsMatchingDifLevel).toEqual(countOfPropsMatching);
      });
    });
  });

  describe('affixTierDefaults()', () => {
    it('exists and returns an object', () => {
      expect(typeof affixTierDefaults()).toBe('object');
    });

    it('is unaffected by pointer behavior', () => {
      const VALID_TIER_KEY = 2;
      const CORRECT_VALUE = 9;
      const DIFFERENT_TIER_VALUE = 'something else';

      const defaults = affixTierDefaults();
      defaults[VALID_TIER_KEY] = DIFFERENT_TIER_VALUE;
      const tierValue = affixTierDefaults()[VALID_TIER_KEY];

      expect(DIFFERENT_TIER_VALUE).not.toEqual(CORRECT_VALUE);
      expect(tierValue).toEqual(CORRECT_VALUE);
    });
  });
});
