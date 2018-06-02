export default function buildRoute(routesMap, route, params) {
  if (typeof routesMap !== 'object') {
    throw new Error(`easyroutes: Invalid argument, routesMap must be an object but was ${typeof routesMap}.`);
  }
  if (typeof route !== 'string') {
    throw new Error(`easyroutes: Invalid argument, routesMap must be an string but was ${typeof routesMap}.`);
  }
  if (typeof routesMap !== 'object') {
    throw new Error(`easyroutes: Invalid argument, routesMap must be an object but was ${typeof routesMap}.`);
  }

  const builtRoute = Object.keys(params).reduce((acc, param) => acc.replace(`:${param}`, params[param]), route);

  if (/:.+/.test(builtRoute)) {
    throw new Error('easyroutes: Invalid output. There are parameters for which you did not set values, while building the route');
  }

  return builtRoute;
}
