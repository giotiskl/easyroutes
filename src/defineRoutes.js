import { checkRouteExists } from './utils';

/**
 * Helper function that merge new routes into an easyroutes instance.
 *
 * @export
 * @param {object} routesMap - map of routes
 * @param {object} routesObject - new route definitions
 * @returns {object} new merged object containing all routes
 */
export default function defineRoutes(routesMap, routesObject) {
  const routes = Object.assign({}, routesMap);

  Object.keys(routesObject).forEach(route => {
    if (typeof routesObject[route] === 'object') {
      // In case it is an object the user is trying to define a module with certain routes
      if (!(route in routes)) {
        // if the module is not already defined, then set to empty object
        routes[route] = {};
      }
      // Then move deeper and execute recursively until strings (i.e. route definitions) are found
      routes[route] = defineRoutes(routes[route], routesObject[route]);
    } else if (typeof routesObject[route] === 'string') {
      // In case of string the user is trying to define a route
      checkRouteExists(route, routes); // will throw if true
      routes[route] = routesObject[route];
    } else {
      throw new Error(
        'easyroutes: Invalid argument type. The route you defined was not a string or an object containing strings',
      );
    }
  });

  return routes;
}
