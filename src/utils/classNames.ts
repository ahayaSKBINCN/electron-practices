import React, { useContext } from "react";


type ClassString = string;
type ClassObject = {
  [key: string]: boolean;
};

type ClassARGUEMENTS = ClassString | ClassObject;

/**
 * @method className utils
 * @param args {@see ClassARGUEMENTS[]}
 * @returns String
 */
export default function classNames(...args: ClassARGUEMENTS[]) {
  const classes: ClassString[] = [];
  args.forEach((str) => {
    switch ( typeof str ) {
      case "string":
        classes.push(str);
        break;
      case "object":
        const classString = Object.keys(str);
        classString.forEach((cs) => {
          if ( str[cs] ) {
            classes.push(cs);
          }
        })
        break;
      default:
        break;
    }
  })
  return classes.join(" ");
}

/**
 * declare the theme mode
 */

const Theme = React.createContext<"light" | "dark">("light");

/* provider */
export const { Provider: ThemeProvider } = Theme;

/* hooks */
export function useThemeClassName() {
  const theme = useContext(Theme);
  const themeClassName = classNames.bind(void 0, theme);
  return { theme, themeClassName }
}
