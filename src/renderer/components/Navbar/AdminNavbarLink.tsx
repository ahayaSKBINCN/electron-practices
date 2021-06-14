import React, { MouseEvent, KeyboardEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
// @material-ui/core components
import {
  makeStyles,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden,
  Popper,
  Divider
} from '@material-ui/core';

// @material-ui/icons
import {
  Person,
  Notifications,
  Dashboard,
  Search
} from '@material-ui/icons'
// core components
import styles from '../../assets/jss/components/headerLink.styles';
import CustomInput from '../CustomInput/Input';
import Button from '../CustomButtons/Button';

const useStyles = makeStyles(styles);
export default function AdminNavbarLinks() {
  const [ innerW, $innerW ] = useState<number>(window.innerWidth);

  function resize() {
    if ( Math.abs(959 - window.innerWidth) < 100 ) $innerW(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', function () {
      resize();
    });
    return window.removeEventListener('resize', function () {
      resize();
    });
  });
  const classes = useStyles({});
  const [ openNotification, setOpenNotification ] = React.useState<any>(null);
  const [ openProfile, setOpenProfile ] = React.useState<any>(null);
  const handleClickNotification = (event: MouseEvent | KeyboardEvent) => {
    if ( openNotification && openNotification.contains(event.target) ) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event: MouseEvent | KeyboardEvent) => {
    if ( openProfile && openProfile.contains(event.target) ) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: `${classes.margin} ${classes.search}`,
          }}
          inputProps={{
            placeholder: 'Search',
            inputProps: {
              'aria-label': 'Search',
            },
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search/>
        </Button>
      </div>
      <Button
        color={innerW > 959 ? 'transparent' : 'white'}
        justIcon={innerW > 959}
        simple={ !( innerW > 959 )}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons}/>
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
        <Button
          color={innerW > 959 ? 'transparent' : 'white'}
          justIcon={innerW > 959}
          simple={ !( innerW > 959 )}
          aria-owns={openNotification ? 'notification-menu-list-grow' : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons}/>
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <p
              role="presentation"
              onClick={handleCloseNotification}
              className={classes.linkText}
              onKeyDown={handleClickNotification}
            >
              Notification
            </p>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={`${classNames({
            [classes.popperClose]: !openNotification,
          })} ${classes.popperNav}`}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              // @ts-ignore
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You&apos;re now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <div className={classes.manager}>
        <Button
          color={innerW > 959 ? 'transparent' : 'white'}
          justIcon={innerW > 959}
          simple={ !( innerW > 959 )}
          aria-owns={openProfile ? 'profile-menu-list-grow' : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons}/>
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={`${classNames({ [classes.popperClose]: !openProfile })} ${
            classes.popperNav
          }`}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              // @ts-ignore
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      个人中心
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      设置
                    </MenuItem>
                    <Divider light/>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      退出
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
