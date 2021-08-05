import React from "react";
export type TypedDebug = [ string, string ]

const useBoolean = function ([ True, False ]: TypedDebug, initialValue?: boolean) {
  const [ state, $state ] = React.useState<boolean>(initialValue ?? false);

  if ( !( True && False ) ) {
    throw new TypeError("Argument [True, False] can not be undefined");
  }
  React.useDebugValue(state ? True : False);

  return [ state, $state ];
}

export default useBoolean;
