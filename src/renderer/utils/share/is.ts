// base on chrome

export function isNull(val: unknown) {
  if ( isObject(val) ) {
    return !val;
  }
}

export function isObject(val: unknown) {
  return typeof val === "object";
}

export function isUndefined(val: unknown) {
  return typeof val === "undefined";
}

export function isNumber(val: unknown) {
  return typeof val === "number";
}

export function isString(val: unknown) {
  return typeof val === "string";
}

export function isNaN(val: string) {
  if ( isNumber(val) ) {
    return val.toString() === "NaN";
  }
  return false;
}


