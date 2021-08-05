import {
  AppBar,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import classNames from 'classnames';
import { Menu } from '@material-ui/icons';
import styles from '../../assets/jss/components/header.styles';
import React from 'react';
import Button from '../CustomButtons/Button';
import RTLNavbarLinks from './RTLNavbarLink';
import AdminNavbarLinks from './AdminNavbarLink';

const useStyles = makeStyles(styles);

interface Route {
  layout: string;
  path: string;
  name: string;
}

interface NavbarProperties {
  color: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  handleDrawerToggle: () => void;
  routes: Route[];
}

export default function Navbar(props: NavbarProperties) {
  const styles = useStyles({});

  function makeBrand() {
    let name = '';
    props.routes.map((prop) => {
      if ( window.location.href.indexOf(prop.path) !== -1 ) {
        name = prop.name;
      }
      return null;
    });
    return name;
  }

  const { color } = props;
  const appBarClazz = classNames({
    [` ${styles[color]}`]: color,
  });
  const { handleDrawerToggle } = props;
  return (
    <AppBar className={styles.appBar + appBarClazz}>
      <Toolbar className={styles.container}>
        <div className={styles.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={styles.title} link>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks/>
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
