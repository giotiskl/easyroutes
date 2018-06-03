export function checkType(name, value, expectedType) {
  const type = typeof value;

  if (type !== expectedType) {
    throw new Error(
      `easyroutes: Invalid argument type, ${name} expected to be ${expectedType} but was ${typeof routesMap}.`,
    );
  }
}

export function checkParamsForMissingValues(matches) {
  if (matches !== null) {
    throw new Error(
      `easyroutes: Invalid output. You did not define a value for the following parameters: ${matches.join(', ')}.`,
    );
  }
}

export function checkRouteExists(route, routesMap) {
  if (route in routesMap) {
    throw new Error(`easyroutes: Invalid operation. Route with name "${route}" is already defined.`);
  }
}

export const paramRegexp = /:\w+/g;
