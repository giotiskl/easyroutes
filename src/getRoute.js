import { checkType } from './utils';

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
