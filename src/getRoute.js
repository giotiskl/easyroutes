export default function getRoute(routesMap, path) {
  if (typeof routesMap !== 'object') {
    throw new Error(`easyroutes: Invalid argument, routesMap must be an object but was ${typeof routesMap}.`);
  }
  if (typeof path !== 'string') {
    throw new Error(`easyroutes: Invalid argument, path must be a string but was ${typeof path}.`);
  }

  const splitPath = path.split('.');

  return splitPath.reduce((acc, pathPart) => {
    if (typeof acc[pathPart] === 'undefined') {
      throw new Error(`easyroutes: route ${path} is undefined.`);
    }
    return acc[pathPart];
  }, routesMap);
}
