import { isNull, isUndefined } from "./is";

export default function killNullProp(obj: any) {
  Object.keys(obj).forEach((propKey) => {
    if ( Object.prototype.hasOwnProperty.call(obj, propKey) ) {
      if ( isNull(obj[propKey]) || isUndefined(obj[propKey]) ) {
       delete obj[propKey];
      }
    }
  })
}
