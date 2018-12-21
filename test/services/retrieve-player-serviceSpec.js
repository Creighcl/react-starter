import * as PlayerService from '../../src/services/retrieve-player-service';
import { ERROR_MSG_BAD_PARAM } from '../../src/utilities/dioProtocol/constants';

const RetrievePlayer = PlayerService.default;

describe('SERVICE: Retrieve Player', () => {
  describe('parameters', () => {
    it('rejects if no string provided', (done) => {
      spyOn(PlayerService, 'retrieveFromFirebase');
      RetrievePlayer()
        .then(() => { fail('should have errored'); done(); })
        .catch((e) => {
          expect(PlayerService.retrieveFromFirebase).not.toHaveBeenCalled();
          expect(e.message).toBe(ERROR_MSG_BAD_PARAM);
          done();
        });
    });
  });

  describe('promise behaviors', () => {
    it('is thenable when service succeeds', (done) => {
      spyOn(PlayerService, 'retrieveFromFirebase').and.returnValue(Promise.resolve('abc'));
      RetrievePlayer('abc')
        .then(() => { done(); })
        .catch((e) => { fail(`should have resolved, errored with ${e}`); done(); });
    });

    it('is caught when service promise rejects', (done) => {
      spyOn(PlayerService, 'retrieveFromFirebase').and.returnValue(Promise.reject(new Error('abc')));
      RetrievePlayer('abc')
        .then(() => { fail('should have rejected promise'); done(); })
        .catch(() => { done(); });
    });
  });
});
