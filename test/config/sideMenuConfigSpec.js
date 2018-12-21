import { sideMenuConfig } from '../../src/config/sideMenuConfig';
import { routeEnum } from '../../src/routers/baseRoutes';

const siteRoute = routeEnum();

describe('CONFIG: Side Menu', () => {
  it('has frozen snapshot of asset', () => {
    expect(sideMenuConfig()).toEqual([
      siteRoute.DUNGEON_START,
      siteRoute.DUNGEON_END,
      undefined,
      siteRoute.DEV_KEY_GEN,
    ]);
  });
});
