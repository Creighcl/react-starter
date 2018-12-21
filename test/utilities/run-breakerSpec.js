import moment from 'moment';
import runBreaker, { ERROR_INVALID_RUN, ERROR_INVALID_PARAMS } from '../../src/utilities/run-breaker';
import { runFixtures } from '../../src/objects/run';
import RunUpdateType from '../../src/objects/runUpdateType';
import {
  DAY_OF_RUN_FORMAT,
  PENALTY_SECONDS_PER_DEATH,
} from '../../src/components/run/constants';

const INVALID_RUN_OBJ = {};
const VALID_RUN_OBJ = runFixtures[0];

describe('UTILITY: Run Breaker', () => {
  describe('input validation', () => {
    it('throws an error if an invalid run is provided', () => {
      expect(() => runBreaker(INVALID_RUN_OBJ)).toThrow(new Error(ERROR_INVALID_RUN));
    });

    it('doesnt error if a valid run is provided', () => {
      expect(typeof runBreaker(VALID_RUN_OBJ)).toBe('object');
    });
  });

  describe('returns object with methods', () => {
    let runBreakdown;
    beforeEach(() => {
      runBreakdown = runBreaker(VALID_RUN_OBJ);
    });

    describe('getUpdatesByTypes() method', () => {
      it('throws exception if an array is not passed', () => {
        expect(() => runBreakdown.getUpdatesByTypes()).toThrow(new Error(ERROR_INVALID_PARAMS));
      });

      it('returns an array of matching types', () => {
        let result = runBreakdown.getUpdatesByTypes([1]);

        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(4);
        result = runBreakdown.getUpdatesByTypes([1, 2]);

        expect(result.length).toEqual(5);
      });
    });

    describe('playerById() method', () => {
      it('returns first object if no integer provided', () => {
        expect(runBreakdown.getPlayerByIdOrFirst(1.3)).toEqual(runBreakdown.run.players[0]);
        expect(runBreakdown.getPlayerByIdOrFirst()).toEqual(runBreakdown.run.players[0]);
        expect(runBreakdown.getPlayerByIdOrFirst('abc')).toEqual(runBreakdown.run.players[0]);
      });

      it('returns object at valid index', () => {
        expect(runBreakdown.getPlayerByIdOrFirst(1)).toEqual(runBreakdown.run.players[1]);
      });
    });

    describe('getUpdatesByTypeAndValue() method', () => {
      it('returns an array', () => {
        expect(Array.isArray(runBreakdown.getUpdatesByTypeAndValue())).toBeTruthy();
      });

      it('returns an array of matches', () => {
        const countOfMatches = runBreakdown.run.updates
          .filter(u => u.type === 2 && u.value === 1)
          .length;

        expect(runBreakdown.getUpdatesByTypeAndValue(2, 1).length).toBe(countOfMatches);
      });
    });

    describe('getUpdatesByTypeBetweenTimes() method', () => {
      it('ubtbt returns an array', () => {
        expect(Array.isArray(runBreakdown.getUpdatesByTypeBetweenTimes())).toBeTruthy();
      });

      it('returns a list of matches', () => {
        const start = new Date('2010-06-05 00:01:00');
        const end = new Date('2010-06-05 00:12:00');
        const countOfMatches = runBreakdown.run.updates
          .filter(u => u.type === 3 && u.time > start && u.time < end).length;

        expect(runBreakdown.getUpdatesByTypeBetweenTimes(3, start, end).length)
          .toBe(countOfMatches);
      });
    });

    describe('getBossEncounters', () => {
      it('gbe returns an array', () => {
        expect(Array.isArray(runBreakdown.getBossEncounters())).toBeTruthy();
      });

      it('returns an object for each boss event', () => {
        const countOfBossEvents = runBreakdown
          .getUpdatesByTypes([RunUpdateType.ENCOUNTER_START]).length;

        expect(runBreakdown.getBossEncounters().length).toEqual(countOfBossEvents);
      });
    });

    describe('getRunDurationSeconds', () => {
      it('returns number', () => {
        expect(typeof runBreakdown.getRunDurationSeconds()).toBe('number');
      });

      it('returns the difference between start and end', () => {
        const differenceSec = (runBreakdown.run.end - runBreakdown.run.start);

        expect(runBreakdown.getRunDurationSeconds())
          .toBe(differenceSec + runBreakdown.getDeathPenaltySeconds());
      });
    });

    describe('getRunDurationString', () => {
      it('returns a string', () => {
        expect(typeof runBreakdown.getRunDurationString()).toBe('string');
      });

      it('returns MM:SS of the duration', () => {
        const seconds = runBreakdown.getRunDurationSeconds();
        const expectedFormat = `${Math.floor(seconds / 60)}:${seconds % 60}`;

        expect(runBreakdown.getRunDurationString()).toEqual(expectedFormat);
      });
    });

    describe('getGoalsCompleted', () => {
      it('returns an integer', () => {
        expect(typeof runBreakdown.getGoalsCompleted()).toBe('number');
      });

      it('returns number of map goals met or beaten', () => {
        expect(runBreakdown.getGoalsCompleted()).toBe(0);
      });
    });

    describe('getRunOnDate', () => {
      it('grd returns a string', () => {
        expect(typeof runBreakdown.getRunOnDate()).toBe('string');
      });

      it('returns formatted run.start date DAY_OF_RUN_FORMAT', () => {
        expect(runBreakdown.getRunOnDate())
          .toEqual(moment(runBreakdown.run.start * 1000).format(DAY_OF_RUN_FORMAT));
      });
    });

    describe('getDeathPenaltySeconds', () => {
      it('returns a number', () => {
        expect(typeof runBreakdown.getDeathPenaltySeconds()).toBe('number');
      });

      it('returns deaths by multiplier', () => {
        const deathCount = runBreakdown.getUpdatesByTypes([RunUpdateType.PLAYER_DEATH]).length;
        const deathPenaltySeconds = deathCount * PENALTY_SECONDS_PER_DEATH;

        expect(runBreakdown.getDeathPenaltySeconds()).toEqual(deathPenaltySeconds);
      });
    });

    describe('getBucketDurationSeconds', () => {
      it('return an object', () => {
        expect(typeof runBreakdown.getBucketDurationSeconds()).toBe('object');
      });

      it('return has total, death, boss, and trash number', () => {
        expect(typeof runBreakdown.getBucketDurationSeconds().total).toBe('number');
        expect(typeof runBreakdown.getBucketDurationSeconds().death).toBe('number');
        expect(typeof runBreakdown.getBucketDurationSeconds().boss).toBe('number');
        expect(typeof runBreakdown.getBucketDurationSeconds().trash).toBe('number');
      });
    });

    describe('getFormattedDurationSeconds', () => {
      it('return a string', () => {
        expect(typeof runBreakdown.getFormattedDurationSeconds()).toBe('string');
      });

      it('MM:SS of the duration', () => {
        const format = runBreakdown.getFormattedDurationSeconds(410);

        expect(format).toEqual('06:50');
      });
    });

    describe('getBattleRezCastEvents', () => {
      it('brez returns an array', () => {
        expect(Array.isArray(runBreakdown.getBattleRezCastEvents())).toBeTruthy();
      });

      it('returns count of brez events where count descended', () => {
        expect(runBreakdown.getBattleRezCastEvents().length).toBe(0);
        expect(runBreakdown.run.updates.length).toBe(6);
        runBreakdown.run.updates.push({
          time: 0,
          type: RunUpdateType.BATTLE_REZ,
          value: 2,
        });
        runBreakdown.run.updates.push({
          time: 10,
          type: RunUpdateType.BATTLE_REZ,
          value: 1,
        });

        expect(runBreakdown.run.updates.length).toBe(8);
        expect(runBreakdown.getBattleRezCastEvents().length).toBe(1);
      });
    });
  });
});
