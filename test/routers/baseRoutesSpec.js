import baseRoutes, { routeEnum } from '../../src/routers/baseRoutes';

describe('ROUTERS: Base Route Enum', () => {
  describe('default export', () => {
    it('exports a function that returns an array', () => {
      expect(typeof baseRoutes).toEqual('function');
      expect(Array.isArray(baseRoutes())).toBeTruthy();
    });

    it('returns routeEnums properties values', () => {
      expect(baseRoutes()).toEqual(Object.values(routeEnum().properties));
    });
  });

  describe('routeEnum()', () => {
    describe('enum behavior', () => {
      it('can call a route by enum call', () => {
        expect(routeEnum().ROOT).toEqual(1);
      });
    });

    describe('properties object', () => {
      let propsObj;

      beforeEach(() => {
        propsObj = Object.values(routeEnum().properties);
      });

      it('has props accessible by enum and number', () => {
        expect(routeEnum().properties[routeEnum().ROOT].path).toEqual('/');
        expect(routeEnum().properties[1].path).toEqual('/');
      });

      it('each entry has string path prop', () => {
        const countMissingProp = propsObj.filter(r => (r.path === undefined)
        || typeof r.path !== 'string')
          .length;

        expect(countMissingProp).toBe(0);
      });

      it('each entry has pageComponent prop', () => {
        const countMissingProp = propsObj.filter(r => (r.pageComponent)
        === undefined)
          .length;

        expect(countMissingProp).toBe(0);
      });

      it('each entry has string title prop', () => {
        const countMissingProp = propsObj.filter(r => (r.title === undefined)
        || typeof r.title !== 'string')
          .length;

        expect(countMissingProp).toBe(0);
      });

      it('each entry has string material_icon prop', () => {
        const countMissingProp = propsObj.filter(r => (r.material_icon === undefined)
          || typeof r.material_icon !== 'string')
          .length;

        expect(countMissingProp).toBe(0);
      });

      it('each entry has string menuText prop', () => {
        const countMissingProp = propsObj.filter(r => (r.menuText === undefined)
          || typeof r.menuText !== 'string')
          .length;

        expect(countMissingProp).toBe(0);
      });

      it('each entry has string authLevel prop', () => {
        const countMissingProp = propsObj.filter(r => (r.authLevel === undefined)
        || typeof r.authLevel !== 'string')
          .length;

        expect(countMissingProp).toBe(0);
      });
    });
  });
});
