import React, { ReactNode } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import styles from '../../assets/jss/components/typography.styles';

interface DangerProps {
  children?: ReactNode;
}

const useStyles = makeStyles(styles);

export default function Danger(props: DangerProps) {
  const classes = useStyles({});
  const { children } = props;
  return (
    <div className={`${classes.defaultFontStyle} ${classes.dangerText}`}>
      {children}
    </div>
  );
}
