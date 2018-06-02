import defineRoutes from './defineRoutes';
import getRoute from './getRoute';
import buildRoute from './buildRoute';

function easyRoutes(...args) {
  if (args.length === 0) {
    // 0 arguments - return routes map
    return this.routes;
  } else if (args.length === 1 && typeof args[0] === 'object') {
    // 1 argument - object - define routes
    this.routes = defineRoutes(this.routes, args[0]);
    return this.routes;
  } else if (args.length === 1 && typeof args[0] === 'string') {
    // 1 argument - string - get path
    return getRoute(this.routes, args[0]);
  } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'object') {
    // 2 arguments - string & object - build url with params
    return buildRoute(this.routes, getRoute(this.routes, args[0]), args[1]);
  }

  // Throw by default when an invalid combination of arguments are passed
  throw new Error('easyroutes: Invalid combination of arguments.');
}

export default class EasyRoutes {
  constructor(routes) {
    const router = easyRoutes.bind(this);
    router.routes = routes || {};

    return router;
  }
}
