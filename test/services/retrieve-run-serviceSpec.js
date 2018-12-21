import Chance from 'chance';
import * as RetrieveRunService from '../../src/services/retrieve-run-service';
import { ERROR_MSG_BAD_PARAM } from '../../src/utilities/dioProtocol/constants';

const chance = new Chance();

describe('SERVICE: Retrieve Run', () => {
  let ANY_STRING;
  beforeEach(() => {
    ANY_STRING = chance.string();
  });

  describe('input validation', () => {
    beforeEach(() => {
      spyOn(RetrieveRunService, 'retrieveFromFirebase').and.returnValue(Promise.resolve(null));
    });

    it('reject promise when no run string provided', (done) => {
      RetrieveRunService.default()
        .then(() => { fail('should have rejected promise'); done(); })
        .catch((e) => { expect(e.message).toEqual(ERROR_MSG_BAD_PARAM); done(); });
    });

    it('resolves promise if string provided', (done) => {
      RetrieveRunService.default(ANY_STRING)
        .then(() => { done(); })
        .catch(() => { fail('should have resolved promise'); done(); });
    });
  });

  describe('makes calls to firebase', () => {
    it('calls for both run types if null returned on first', (done) => {
      const firebaseSpy = spyOn(RetrieveRunService, 'retrieveFromFirebase').and.returnValue(Promise.resolve(null));
      RetrieveRunService.default(ANY_STRING)
        .then(() => {
          expect(firebaseSpy).toHaveBeenCalledTimes(2);
          expect(firebaseSpy).toHaveBeenCalledWith(true, ANY_STRING);
          expect(firebaseSpy).toHaveBeenCalledWith(false, ANY_STRING);
          done();
        })
        .catch(() => fail('expected promise to resolve'));
    });

    it('calls for one type of run only if result returns', (done) => {
      const firebaseSpy = spyOn(RetrieveRunService, 'retrieveFromFirebase').and.returnValue(Promise.resolve({}));
      RetrieveRunService.default(ANY_STRING)
        .then(() => {
          expect(firebaseSpy).toHaveBeenCalledTimes(1);
          expect(firebaseSpy).toHaveBeenCalledWith(true, ANY_STRING);
          done();
        })
        .catch(() => fail('expected promise to resolve'));
    });
  });
});
