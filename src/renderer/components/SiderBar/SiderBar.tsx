/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { Drawer, Hidden } from "@material-ui/core";
// core components
import AdminNavbarLinks from "../Navbar/AdminNavbarLink";

import useStyles from "../../assets/jss/components/sidebar.styles";
import SideMenu from "./SideMenu";


export default function Sidebar(props: SidebarProps) {
  const classes = useStyles();


  const { color, logo, image, logoText, routes } = props;


  const brand = (
    <div className={classes.logo}>
      <a
        className={classes.logoLink}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img}/>
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks/>
            <SideMenu classes={classes} color={color} routes={routes}/>
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <SideMenu classes={classes} color={color} routes={routes}/>
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

export interface SidebarProps {
  handleDrawerToggle: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  bgColor: "purple" | "blue" | "green" | "orange" | "red";
  logo: string;
  image: string;
  logoText: string;
  routes: any[];
  open: boolean;
  color: TypedTheme;
}


