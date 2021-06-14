import {
  AppBar,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import classNames from 'classnames';
import Menu from '@material-ui/icons/Menu';
import styles from '../../assets/jss/components/header.styles';
import React from 'react';
import Button from '../CustomButtons/Button';
import RTLNavbarLinks from './RTLNavbarLink';
import AdminNavbarLinks from './AdminNavbarLink';

const useStyles = makeStyles(styles);

interface Route {
  layout: string;
  path: string;
  rtlName: string;
  name: string;
}

interface NavbarProperties {
  color: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  rtlActive: boolean;
  handleDrawerToggle: () => void;
  routes: Route[];
}

export default function Navbar(props: NavbarProperties) {
  const clazz = useStyles({});

  function makeBrand() {
    let name = '';
    props.routes.map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name;
  }

  const { color } = props;
  const appBarClazz = classNames({
    [` ${clazz[color]}`]: color,
  });
  const { rtlActive, handleDrawerToggle } = props;
  return (
    <AppBar className={clazz.appBar + appBarClazz}>
      <Toolbar className={clazz.container}>
        <div className={clazz.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={clazz.title} link>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
