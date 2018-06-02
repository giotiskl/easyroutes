export default function defineRoutes(routesMap, routesObject) {
  const routes = Object.assign({}, routesMap);

  Object.keys(routesObject).forEach((route) => {
    if (typeof route === 'object') {
      // In case it is an object the user is trying to define a module with certain routes
      if (!(route in routes)) {
        // if the module is not already defined, then set to empty object
        routes[route] = {};
      }
      // Then move deeper and execute recursively until strings (i.e. route definitions) are found
      defineRoutes(routes[route], routesObject[route]);
    } else if (typeof route === 'string') {
      // In case of string the user is trying to define a route
      if (route in routes) {
        throw new Error('easyroutes: Invalid operation. You tried to define a route that is already defined.');
      } else {
        routes[route] = routesObject[route];
      }
    } else {
      throw new Error('easyroutes: Invalid type. The route you defined was not a string or an object containing strings');
    }
  });

  return routes;
}
