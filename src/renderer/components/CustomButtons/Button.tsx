import { Button, ButtonClassKey, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import styles from '../../assets/jss/components/button.styles';

type ButtonChild = React.ReactElement | Node | React.ReactText;
type ButtonChildren = ButtonChild[] | ButtonChild;

export interface ButtonProperties {
  [key: string]: boolean | string | Node | unknown;

  color?:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'rose'
    | 'white'
    | 'transparent';
  size?: 'sm' | 'lg';
  round?: boolean;
  simple?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  className?: string;
  muiClasses?: Partial<Record<ButtonClassKey, string>> | undefined;
  children: ButtonChildren;
}

const useStyles = makeStyles(styles);
function RegularButton(props: ButtonProperties) {
  const clazz = useStyles({});
  const {
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = { ...RegularButton.defaultProps, ...props };
  const btnClasses = classNames({
    [clazz.button]: true,
    [clazz[size]]: size,
    [clazz[color]]: color,
    [clazz.round]: round,
    [clazz.disabled]: disabled,
    [clazz.simple]: simple,
    [clazz.block]: block,
    [clazz.link]: link,
    [clazz.justIcon]: justIcon,
    [className]: className,
  });
  return (
    <Button {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
}

RegularButton.defaultProps = {
  color: 'transparent',
  size: 'lg',
  round: false,
  simple: false,
  disabled: false,
  block: false,
  link: false,
  justIcon: false,
  className: '',
  muiClasses: {},
};
export default RegularButton;
