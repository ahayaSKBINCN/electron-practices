import React from "react";
import { Collapse, List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import MenuItemIcon from "./MenuItemIcon";
import useStyles from "../../assets/jss/components/sidebar.styles";


interface SideMenuProps {
  classes: ClassNameMap<"item" | "itemLink" | "activePro" | "whiteFont" | "itemText" | "itemTextRTL" | TypedTheme>;
  color: TypedTheme;
  routes: Route[];
}

// verifies if routeName is the one active (in browser input)
function activeRoute(routeName: string) {
  return window.location.href.indexOf(routeName) > -1;
}

const menuMapper = function (routes: Route[]): Section {
  const _routes = routes.map(i => ( { ...i } ));
  return _routes.reduce((pre, cur) => {
    const { section } = cur;
    if ( !pre[section] ) {
      pre[section] = [];
    }
    if ( cur.route ) {
      // @ts-ignore
      cur.route = menuMapper(cur.route);
    }
    pre[section].push(cur as SectionRoute)

    return pre;
  }, {} as Section);
}


export default function SideMenu(props: SideMenuProps) {
  const { pathname } = useLocation();
  const {
    color,
    routes
  } = props;
  const classes = useStyles();
  const [ openKeys, $openKeys ] = React.useState<string[]>([ pathname ]);

  const isOpen = function (keyPath: string) {
    let result: boolean = false;
    openKeys.forEach(key => {
      if ( key.includes(keyPath) ) {
        result = true
      }
    });
    return result;
  }

  const openKeyStrategy = function (rawKey: string) {
    const openedIdx = openKeys.findIndex(key=>key.includes(rawKey));
    if(openedIdx>-1){
      openKeys.splice(openedIdx,1);
    }else{
      openKeys.push(rawKey);
    }
    $openKeys(openKeys.slice())
  }

  const renderSection = function (section: Section) {
    const titles = Object.keys(section);
    return titles.map((title) => {
      return (
        <List
          component="nav"
          key={title}
          aria-labelledby="nested-list-subheader"
        >
          {section[title].map((route) => {
            const { layout = "/admin", path, name, route: subRoute, menu } = route;
            let listItemClasses;
            if ( path === "/upgrade-to-pro" ) {
              listItemClasses = classNames({
                [" " + classes[color]]: true
              });
            } else {
              listItemClasses = classNames({
                [" " + classes[color as TypedTheme]]: activeRoute(layout + path)
              });
            }
            const whiteFontClasses = classNames({
              [" " + classes.whiteFont]: activeRoute(layout + path)
            });

            const RouteItem = (
              <NavLink
                to={layout + path}
                key={layout + path}
                activeClassName="active"
                className={classes.item}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  <MenuItemIcon
                    icon={menu?.icon}
                    whiteFontClasses={whiteFontClasses}
                    classes={classes}
                  />
                  <ListItemText
                    primary={menu?.name ?? name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            );
            const RouteList = (
              <React.Fragment key={layout + path}>
                <ListItem
                  className={classes.itemLink + listItemClasses}
                  onClick={openKeyStrategy.bind(void 0, layout + path)}
                >
                  <MenuItemIcon
                    icon={menu?.icon}
                    whiteFontClasses={whiteFontClasses}
                    classes={classes}
                  />
                  <ListItemText
                    primary={menu?.name ?? name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                  {isOpen(layout + path) ? <ExpandLess style={{ color: "white" }}/> :
                    <ExpandMore style={{ color: "white" }}/>}
                </ListItem>
                {subRoute && (
                  <Collapse in={isOpen(layout + path)}>
                    {renderSection(subRoute)}
                  </Collapse>
                )}
              </React.Fragment>
            );
            return subRoute ? RouteList : RouteItem;
          })}
        </List> )
    })
  }
  return (
    <>
      {renderSection(menuMapper(routes))}
    </>
  );
}
