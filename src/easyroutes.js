import defineRoutes from './defineRoutes';
import getRoute from './getRoute';
import { buildRoute, buildRouteWithOptions } from './buildRoute';

function easyRoutes(...args) {
  if (args.length === 0) {
    // 0 arguments - return routes map
    return this.routes;
  } else if (args.length === 1 && typeof args[0] === 'object') {
    // 1 argument - object - define routes
    const [userRoutes] = args;
    this.routes = defineRoutes(this.routes, userRoutes);
    return this.routes;
  } else if (args.length === 1 && typeof args[0] === 'string') {
    // 1 argument - string - get path
    const [path] = args;
    return getRoute(this.routes, path);
  } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'object') {
    // 2 arguments - string & object
    if ('params' in args[1] || 'search' in args[1] || 'hash' in args[1]) {
      // User is calling version with  options
      const [path, options] = args;
      return buildRouteWithOptions(this.routes, getRoute(this.routes, path), options);
    }
    // User is calling version only with params
    const [path, params] = args;
    return buildRoute(this.routes, getRoute(this.routes, path), params);
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
