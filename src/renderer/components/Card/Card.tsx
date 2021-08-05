import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import styles from '../../assets/jss/components/card.styles';

const useStyles = makeStyles(styles);

interface CardProps {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  chart?: boolean;
  children?: React.ReactNode;
}

export default function Card(props: CardProps) {
  const classes = useStyles({});
  const { className = '', children, plain, profile, chart, ...rest } = props;
  const cardClasses = classNames(className, {
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}
