import {
  DAY_OF_RUN_FORMAT,
  DURATION_LABEL,
  DURATION_AXIS_FORMAT,
  DURATION_TIME_FORMAT,
  MINION_AXIS_FORMAT,
  MINION_PERCENTAGE_LABEL,
  BOSS_EVENT_SERIES_LABEL,
  DEATH_EVENT_SERIES_LABEL,
  SUMMARY_AVATAR_SIZE,
  TILE_CLASSNAME,
  PENALTY_SECONDS_PER_DEATH,
} from '../../../src/components/run/constants';

describe('CONSTANTS: Component/Run', () => {
  it('have frozen values', () => {
    expect(DAY_OF_RUN_FORMAT).toEqual('MMM DD \'YY');
    expect(DURATION_LABEL).toEqual('Time Elapsed');
    expect(DURATION_TIME_FORMAT).toEqual('HH\'h\':mm\'m\':ss\'s\'');
    expect(DURATION_AXIS_FORMAT).toEqual('HH:mm:ss');
    expect(MINION_AXIS_FORMAT).toEqual('#\'%\'');
    expect(MINION_PERCENTAGE_LABEL).toEqual('Minions');
    expect(BOSS_EVENT_SERIES_LABEL).toEqual('Boss Time');
    expect(DEATH_EVENT_SERIES_LABEL).toEqual('Death Event');
    expect(SUMMARY_AVATAR_SIZE).toEqual(12);
    expect(TILE_CLASSNAME).toEqual('run-data-summary--tile');
    expect(PENALTY_SECONDS_PER_DEATH).toEqual(5);
  });
});
