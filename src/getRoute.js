import { checkType } from './utils';

/**
 * Helper function to extract a route out of the routes map.
 *
 * @export
 * @param {object} routesMap - map of routes
 * @param {string} path of route in the routes map
 * @returns {string} the route as a string with no parameters replaced
 */
export default function getRoute(routesMap, path) {
  checkType('routesMap', routesMap, 'object');
  checkType('path', path, 'string');

  const splitPath = path.split('.');

  return splitPath.reduce((acc, pathPart) => {
    if (typeof acc[pathPart] === 'undefined') {
      throw new Error(`easyroutes: route ${path} is undefined.`);
    }
    return acc[pathPart];
  }, routesMap);
}
