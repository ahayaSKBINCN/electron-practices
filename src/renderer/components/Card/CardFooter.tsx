import React, { ReactNode } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import styles from '../../assets/jss/components/cardFooter.styles';

interface CardFooterProps {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  stats?: boolean;
  chart?: boolean;
  children?: ReactNode;
}

const useStyles = makeStyles(styles);
export default function CardFooter(props: CardFooterProps) {
  const classes = useStyles({});
  const {
    className = '',
    children,
    plain,
    profile,
    stats,
    chart,
    ...rest
  } = props;
  const cardFooterClasses = classNames(className, {
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}
