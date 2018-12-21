import {
  ROOT_PATH,
  LEADERBOARD_PATH,
  BLOG_PATH,
  DUNGEONEERS_PATH,
  PRIVACY_PATH,
  TERMS_PATH,
  PLAYER_PATH,
  TEAM_PATH,
  DUNGEON_RUN_PATH,
  LOGIN_PATH,
  SETTINGS_PATH,
  DASHBOARD_PATH,
  START_RUN_PATH,
  FINISH_RUN_PATH,
  DEV_KEY_GEN_PATH,
} from '../../src/routers/route-constants';


describe('CONSTANTS - Route Constants', () => {
  it('has frozen values', () => {
    expect(ROOT_PATH).toEqual('/');
    expect(LEADERBOARD_PATH).toEqual('/leaderboards');
    expect(BLOG_PATH).toEqual('/blog');
    expect(DUNGEONEERS_PATH).toEqual('/dungeoneers');
    expect(PRIVACY_PATH).toEqual('/privacy');
    expect(TERMS_PATH).toEqual('/terms');
    expect(PLAYER_PATH).toEqual('/player/:playerid');
    expect(TEAM_PATH).toEqual('/team');
    expect(DUNGEON_RUN_PATH).toEqual('/run/:runid');
    expect(LOGIN_PATH).toEqual('/login');
    expect(SETTINGS_PATH).toEqual('/settings');
    expect(DASHBOARD_PATH).toEqual('/dashboard');
    expect(START_RUN_PATH).toEqual('/start');
    expect(FINISH_RUN_PATH).toEqual('/finish');
    expect(DEV_KEY_GEN_PATH).toEqual('/keygen');
  });
});
