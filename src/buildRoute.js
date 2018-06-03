import { checkType, checkParamsForMissingValues, paramRegexp } from './utils';

export function buildRoute(routesMap, route, params) {
  checkType('routesMap', routesMap, 'object');
  checkType('route', route, 'string');
  checkType('params', params, 'object');

  const builtRoute = Object.keys(params).reduce((acc, param) => acc.replace(`:${param}`, params[param]), route);

  checkParamsForMissingValues(builtRoute.match(paramRegexp));

  return builtRoute;
}

export function buildRouteWithOptions(routesMap, route, options) {
  checkType('routesMap', routesMap, 'object');
  checkType('route', route, 'string');
  checkType('options', options, 'object');

  let builtRoute = route;

  if ('params' in options) {
    // in case the user has defined params, replace them
    builtRoute = buildRoute(routesMap, route, options.params);
  } else {
    // if user did not define params, but defined search and/or hash
    // then check the path being built for missing params
    checkParamsForMissingValues(builtRoute.match(paramRegexp));
  }

  if ('search' in options) {
    if (typeof options.search === 'string') {
      // when search is defined as string simply append
      builtRoute += options.search;
    } else if (typeof options.search === 'object') {
      // when search is defined as object build the string
      const searchString = Object.entries(options.search).reduce((acc, [key, value]) => {
        const valueNotNil = typeof value !== 'undefined' && value !== null;
        const searchPart = `${key}${valueNotNil && `=${value}`}&`;
        return acc + searchPart;
      }, '?');
      builtRoute += searchString.slice(0, searchString.length - 1);
    } else {
      // if it has another type throw
      throw new Error(
        `easyroutes: Invalid argument type, search expected to be string/object but was ${typeof options.search}.`,
      );
    }
  }

  if ('hash' in options) {
    checkType('hash', options.hash, 'string');
    builtRoute += options.hash;
  }

  return builtRoute;
}
