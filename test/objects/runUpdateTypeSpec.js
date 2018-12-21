import runUpdateTypeEnum from '../../src/objects/runUpdateType';

describe('ENUM: Run Update Type', () => {
  describe('enum functionality', () => {
    it('can call by enum value', () => {
      expect(runUpdateTypeEnum.BOSS_KILL).toEqual(2);
    });

    it('can call props with number', () => {
      expect(runUpdateTypeEnum.properties[4].name).toEqual('Battle Rez Count Change');
    });

    it('can call props with enum', () => {
      expect(runUpdateTypeEnum.properties[runUpdateTypeEnum.BATTLE_REZ].name).toEqual('Battle Rez Count Change');
    });
  });

  describe('properties object', () => {
    it('has matching # of enum values and prop entries', () => {
      const enumValueCount = Object.values(runUpdateTypeEnum)
        .filter(v => typeof v === 'number').length;
      const entryCount = Object.values(runUpdateTypeEnum.properties).length;

      expect(enumValueCount).toEqual(entryCount);
    });

    it('has a string name prop for each entry', () => {
      const entriesMissingName = Object.values(runUpdateTypeEnum.properties)
        .filter(ut => typeof ut.name !== 'string').length;

      expect(entriesMissingName).toEqual(0);
    });
  });
});
