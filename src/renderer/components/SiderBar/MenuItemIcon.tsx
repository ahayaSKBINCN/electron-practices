import React, { useEffect } from "react";
import { Icon } from "@material-ui/core";
import classNames from "classnames";

interface AsyncIconProp {
  getter: () => Promise<any>;
  classes?: string;
}


interface MenuItemIconProp {
  icon?: any;
  whiteFontClasses: string;
  classes: { [key: string]: string };

}

export default function MenuItemIcon(props: MenuItemIconProp) {
  const { icon, whiteFontClasses, classes } = props


  let returns;
  switch ( typeof icon ) {
    case "string":
      returns = ( <Icon
        className={classNames(classes.itemIcon, whiteFontClasses)}
      >
        {icon}
      </Icon> )
      break;
    case "object":
      returns = ( React.createElement(icon, {
        className:
          classNames(
            classes.itemIcon,
            whiteFontClasses,
          )
      }) )
      break;
    default:
      returns = (<span/>)
  }

  return returns;

}
