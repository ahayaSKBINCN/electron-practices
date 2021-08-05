import React, { ReactNode } from 'react';
import { makeStyles, Grid } from '@material-ui/core';

const styles = {
  grid: {
    margin: '0 -15px !important',
    width: 'unset',
  },
};
const useStyles = makeStyles(styles);

interface GridContainerProps {
  children?: ReactNode;
}

export default function GridContainer(props: GridContainerProps) {
  const classes = useStyles({});
  const { children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}
