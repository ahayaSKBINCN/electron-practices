function deCycle(object: any) {

  const objects: any[] = [],   // Keep a reference to each unique object or array
    paths: any[] = [];     // Keep the path to each unique object or array

  return ( function derez(value, path): any {

// The derez recurses through the object, producing the deep copy.

    let i,          // The loop counter
      name,       // Property name
      nu: any;         // The new object or array

    var _value = value && value.toJSON instanceof Function ? value.toJSON() : value;
// typeof null === 'object', so go on if this value is really an object but not
// one of the weird builtin objects.

    if ( typeof _value === 'object' && _value !== null ) {

// If the value is an object or array, look to see if we have already
// encountered it. If so, return a $ref/path object. This is a hard way,
// linear search that will get slower as the number of unique objects grows.

      for ( i = 0; i < objects.length; i += 1 ) {
        if ( objects[i] === _value ) {
          return { $ref: paths[i] };
        }
      }

// Otherwise, accumulate the unique value and its path.

      objects.push(_value);
      paths.push(path);

// If it is an array, replicate the array.

      if ( Object.prototype.toString.apply(_value) === '[object Array]' ) {
        nu = [];
        for ( i = 0; i < _value.length; i += 1 ) {
          nu[i] = derez(_value[i], path + '[' + i + ']');
        }
      } else {

// If it is an object, replicate the object.

        nu = {};
        for ( name in _value ) {
          if ( Object.prototype.hasOwnProperty.call(_value, name) ) {
            nu[name] = derez(_value[name],
              path + '[' + JSON.stringify(name) + ']');
          }
        }
      }
      return nu;
    }
    return _value;
  }(object, '$') );
}

export default deCycle;
