import { Hidden, makeStyles, MenuItem, MenuList, Grow, Paper, ClickAwayListener, Popper } from '@material-ui/core';
import classNames from 'classnames';
import React, { MouseEvent, KeyboardEvent } from 'react';


// @material-ui/icons
import { Person, Notifications, Dashboard, Search } from '@material-ui/icons';

import styles from '../../assets/jss/components/headerLink.styles';
import Button from '../CustomButtons/Button';
import CustomInput from '../CustomInput/Input';

const useStyles = makeStyles(styles);

export default function RTLNavbarLinks() {
  const classes = useStyles({});
  const [ open, setOpen ] = React.useState<any>(null);
  const handleToggle = (event: MouseEvent | KeyboardEvent) => {
    if ( open && open.contains(event.target) ) {
      setOpen(null);
    } else {
      setOpen(event.currentTarget);
    }
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: `${classes.margin} ${classes.search}`,
          }}
          inputProps={{
            placeholder: 'جستجو...',
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
        color={window.innerWidth > 959 ? 'transparent' : 'white'}
        justIcon={window.innerWidth > 959}
        simple={ !( window.innerWidth > 959 )}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons}/>
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>آمارها</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={ !( window.innerWidth > 959 )}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons}/>
          <span className={classes.notifications}>۵</span>
          <Hidden mdUp implementation="css">
            <p
              role="presentation"
              onClick={handleToggle}
              className={classes.linkText}
              onKeyDown={handleToggle}
            >
              اعلان‌ها
            </p>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(open)}
          anchorEl={open}
          transition
          disablePortal
          className={`${classNames({ [classes.popperClose]: !open })} ${
            classes.popperNav
          }`}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              // @ts-ignore
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      محمدرضا به ایمیل شما پاسخ داد
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      شما ۵ وظیفه جدید دارید
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      از حالا شما با علیرضا دوست هستید
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      اعلان دیگر
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      اعلان دیگر
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <Button
        color={window.innerWidth > 959 ? 'transparent' : 'white'}
        justIcon={window.innerWidth > 959}
        simple={ !( window.innerWidth > 959 )}
        aria-label="Person"
        className={classes.buttonLink}
      >
        <Person className={classes.icons}/>
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>حساب کاربری</p>
        </Hidden>
      </Button>
    </div>
  );
}
