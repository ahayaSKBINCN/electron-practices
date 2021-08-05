import React, { ReactNode } from 'react';
// @material-ui/core components
import { makeStyles, Grid, GridProps } from '@material-ui/core';

const styles = {
  grid: {
    padding: '0 15px !important',
  },
};
const useStyles = makeStyles(styles);

interface GridItemProps extends GridProps {
  children?: ReactNode;
}

export default function GridItem(props: GridItemProps) {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}
