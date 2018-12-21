import decodeRunService from '../../src/services/decode-run-service';
import { isValidKeystone } from '../../src/fixtures/keys';
import { playerValidation } from '../../src/objects/player';
import { runUpdateValidation } from '../../src/objects/runUpdate';

const validRunString = '{"updates":{"1":{"value":3,"type":1,"time":1538973168},"2":{"value":4,"type":1,"time":1538973175},"3":{"value":5,"type":1,"time":1538973179},"4":{"value":4,"type":5,"time":1538973182},"5":{"value":7,"type":1,"time":1538973232},"6":{"value":9,"type":1,"time":1538973238},"7":{"value":10,"type":1,"time":1538973251},"8":{"value":12,"type":1,"time":1538973254},"9":{"value":4,"type":5,"time":1538973291},"10":{"value":2,"type":5,"time":1538973294},"11":{"value":14,"type":1,"time":1538973299},"12":{"value":0,"type":5,"time":1538973301},"13":{"value":4,"type":5,"time":1538973309},"14":{"value":3,"type":5,"time":1538973313},"15":{"value":1,"type":5,"time":1538973337},"16":{"value":16,"type":1,"time":1538973350},"17":{"value":17,"type":1,"time":1538973374},"18":{"value":0,"type":5,"time":1538973415},"19":{"value":19,"type":1,"time":1538973426},"20":{"value":21,"type":1,"time":1538973438},"21":{"value":22,"type":1,"time":1538973446},"22":{"value":24,"type":1,"time":1538973454},"23":{"value":"ENCOUNTER_START","type":6,"time":1538973466},"24":{"value":"ENCOUNTER_END","type":6,"time":1538973533},"25":{"value":2111,"type":2,"time":1538973533},"26":{"value":25,"type":1,"time":1538973561},"27":{"value":2,"type":5,"time":1538973565},"28":{"value":1,"type":5,"time":1538973581},"29":{"value":0,"type":5,"time":1538973581},"30":{"value":4,"type":5,"time":1538973584},"31":{"value":26,"type":1,"time":1538973585},"32":{"value":28,"type":1,"time":1538973589},"33":{"value":3,"type":5,"time":1538973592},"34":{"value":30,"type":1,"time":1538973648},"35":{"value":31,"type":1,"time":1538973678},"36":{"value":33,"type":1,"time":1538973680},"37":{"value":34,"type":1,"time":1538973684},"38":{"value":36,"type":1,"time":1538973688},"39":{"value":38,"type":1,"time":1538973721},"40":{"value":39,"type":1,"time":1538973731},"41":{"value":41,"type":1,"time":1538973776},"42":{"value":3,"type":5,"time":1538973785},"43":{"value":42,"type":1,"time":1538973800},"44":{"value":44,"type":1,"time":1538973811},"45":{"value":46,"type":1,"time":1538973819},"46":{"value":47,"type":1,"time":1538973852},"47":{"value":49,"type":1,"time":1538973857},"48":{"value":50,"type":1,"time":1538973882},"49":{"value":52,"type":1,"time":1538973889},"50":{"value":53,"type":1,"time":1538973925},"51":{"value":55,"type":1,"time":1538973926},"52":{"value":57,"type":1,"time":1538973959},"53":{"value":58,"type":1,"time":1538973964},"54":{"value":60,"type":1,"time":1538973966},"55":{"value":1,"type":5,"time":1538973986},"56":{"value":61,"type":1,"time":1538973996},"57":{"value":63,"type":1,"time":1538974017},"58":{"value":65,"type":1,"time":1538974064},"59":{"value":66,"type":1,"time":1538974071},"60":{"value":68,"type":1,"time":1538974107},"61":{"value":69,"type":1,"time":1538974126},"62":{"value":71,"type":1,"time":1538974131},"63":{"value":"ENCOUNTER_START","type":6,"time":1538974139},"64":{"value":"ENCOUNTER_END","type":6,"time":1538974258},"65":{"value":2118,"type":2,"time":1538974258},"66":{"value":73,"type":1,"time":1538974298},"67":{"value":74,"type":1,"time":1538974314},"68":{"value":76,"type":1,"time":1538974319},"69":{"value":77,"type":1,"time":1538974321},"70":{"value":79,"type":1,"time":1538974345},"71":{"value":3,"type":5,"time":1538974397},"72":{"value":1,"type":5,"time":1538974397},"73":{"value":2,"type":5,"time":1538974398},"74":{"value":4,"type":5,"time":1538974398},"75":{"value":81,"type":1,"time":1538974412},"76":{"value":0,"type":5,"time":1538974421},"77":{"value":84,"type":1,"time":1538974520},"78":{"value":"ENCOUNTER_START","type":6,"time":1538974531},"79":{"value":3,"type":5,"time":1538974551},"80":{"value":3,"type":5,"time":1538974573},"81":{"value":2,"type":5,"time":1538974577},"82":{"value":1,"type":5,"time":1538974624},"83":{"value":0,"type":5,"time":1538974624},"84":{"value":4,"type":5,"time":1538974626},"85":{"value":"ENCOUNTER_END","type":6,"time":1538974627},"86":{"value":86,"type":1,"time":1538974716},"87":{"value":88,"type":1,"time":1538974722},"88":{"value":89,"type":1,"time":1538974745},"89":{"value":"ENCOUNTER_START","type":6,"time":1538974759},"90":{"value":2,"type":5,"time":1538974821},"91":{"value":3,"type":5,"time":1538974842},"92":{"value":"ENCOUNTER_END","type":6,"time":1538974877},"93":{"value":2112,"type":2,"time":1538974877},"94":{"value":92,"type":1,"time":1538974925},"95":{"value":93,"type":1,"time":1538974968},"96":{"value":95,"type":1,"time":1538974971},"97":{"value":4,"type":5,"time":1538974978},"98":{"value":96,"type":1,"time":1538974984},"99":{"value":2,"type":5,"time":1538974997},"100":{"value":98,"type":1,"time":1538974998},"101":{"value":3,"type":5,"time":1538975010},"102":{"value":1,"type":5,"time":1538975126},"103":{"value":100,"type":1,"time":1538975160},"104":{"value":2,"type":5,"time":1538975255},"105":{"value":1,"type":5,"time":1538975256},"106":{"value":4,"type":5,"time":1538975259},"107":{"value":0,"type":5,"time":1538975263},"108":{"value":3,"type":5,"time":1538975263},"109":{"value":1,"type":5,"time":1538975423},"110":{"value":"ENCOUNTER_START","type":6,"time":1538975506},"111":{"value":0,"type":5,"time":1538975619},"112":{"value":2,"type":5,"time":1538975631},"113":{"value":1,"type":5,"time":1538975644},"114":{"value":4,"type":5,"time":1538975646},"115":{"value":3,"type":5,"time":1538975651},"116":{"value":"ENCOUNTER_END","type":6,"time":1538975652},"117":{"value":"ENCOUNTER_START","type":6,"time":1538975810},"118":{"value":"ENCOUNTER_END","type":6,"time":1538975976},"119":{"value":2123,"type":2,"time":1538975976},"0":{"value":1,"type":1,"time":1538973136}},"wowpatch":"8.0.1","time":1538973112,"details":{"players":{"1":{"name":"Heliakon","class":2,"race":1,"role":3,"server":"Maelstrom"},"2":{"name":"Orynth","class":1,"race":1,"role":3,"server":"EmeraldDream"},"3":{"name":"Xebo","class":2,"race":1,"role":3,"server":"Stormrage"},"4":{"name":"Whiset","class":1,"race":4,"role":1,"server":"Maelstrom"},"0":{"name":"Daroq","class":11,"race":22,"role":2,"server":"Fizzcrank"}},"keystone":{"0":{"difficulty":5,"affix":{"1":10,"2":7,"3":2,"4":16},"id":251}},"start":1538973112,"end":1538975976},"diopatch":"0.0.1"}';

describe('SERVICE: Decode Run', () => {
  describe('decodeRunService()', () => {
    it('returns a promise', () => {
      expect(decodeRunService(validRunString).then).toBeDefined();
    });
  });

  describe('promise results', () => {
    it('rejects if no string is passed', (done) => {
      decodeRunService(undefined).then(() => {
        fail('Promise should be rejected');
        done();
      }).catch(() => {
        done();
      });
    });

    it('resolves with an object with players array with 1 or more values', (done) => {
      decodeRunService(validRunString).then((decodedRun) => {
        expect(decodedRun).toBeDefined();
        expect(decodedRun.players).toBeDefined();
        expect(Array.isArray(decodedRun.players)).toBeTruthy();
        expect(decodedRun.players.length).toBeGreaterThan(0);
        const validPlayers = decodedRun.players.filter((p) => {
          try {
            return playerValidation(p);
          } catch (e) {
            return false;
          }
        });

        expect(validPlayers.length).toBe(decodedRun.players.length);
        done();
      }).catch(() => {
        fail('Promise should have resolved');
        done();
      });
    });

    it('resolves with object with valid keystone obj', (done) => {
      decodeRunService(validRunString).then((decodedRun) => {
        expect(decodedRun.keystone).toBeDefined();
        expect(isValidKeystone(decodedRun.keystone)).toBeTruthy();
        done();
      }).catch(() => {
        fail('Promise should have resolved');
        done();
      });
    });

    it('resolves with object with encodedRun value matching input', (done) => {
      decodeRunService(validRunString).then((decodedRun) => {
        expect(decodedRun.encodedRun).toBeDefined();
        expect(decodedRun.encodedRun).toEqual(validRunString);
        done();
      }).catch(() => {
        fail('Promise should have resolved');
        done();
      });
    });

    it('resolves with object with diopatch string', (done) => {
      decodeRunService(validRunString).then((decodedRun) => {
        expect(decodedRun.diopatch).toBeDefined();
        expect(typeof decodedRun.diopatch).toEqual('string');
        done();
      }).catch(() => {
        fail('Promise should have resolved');
        done();
      });
    });

    it('resolves with object with wowpatch string', (done) => {
      decodeRunService(validRunString).then((decodedRun) => {
        expect(decodedRun.wowpatch).toBeDefined();
        expect(typeof decodedRun.wowpatch).toEqual('string');
        done();
      }).catch(() => {
        fail('Promise should have resolved');
        done();
      });
    });

    it('resolves with object with moment: Start', (done) => {
      decodeRunService(validRunString).then((decodedRun) => {
        expect(decodedRun.start).toBeDefined();
        expect(typeof decodedRun.start).toBe('number');
        done();
      }).catch(() => {
        fail('Promise should have resolved');
        done();
      });
    });

    it('resolves with object with moment: End', (done) => {
      decodeRunService(validRunString).then((decodedRun) => {
        expect(decodedRun.end).toBeDefined();
        expect(typeof decodedRun.end).toBe('number');
        done();
      }).catch(() => {
        fail('Promise should have resolved');
        done();
      });
    });

    it('resolves with array of updates', (done) => {
      decodeRunService(validRunString).then((decodedRun) => {
        expect(decodedRun.updates).toBeDefined();
        expect(Array.isArray(decodedRun.updates)).toBeTruthy();
        const validUpdates = decodedRun.updates.map((update) => {
          try {
            return runUpdateValidation(update);
          } catch (e) {
            return false;
          }
        });

        expect(validUpdates.length).toBe(decodedRun.updates.length);
        done();
      }).catch(() => {
        fail('Promise should have resolved');
        done();
      });
    });
  });

  describe('version specific decodes', () => {
    it('decodes version specific', () => {

    });
  });
});
