import deCycle from "../deCycle";

function memorized(fn: AnyFn) {
  const map = new Map();
  return (...args: any[]) => {
    const strArg = JSON.stringify(deCycle(args));
    let result = map.get(strArg);
    if ( !result ) {
      result = fn(...args);
      map.set(strArg, result);
    }
    return result;
  }
}

export default memorized;
