import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import styles from '../../assets/jss/components/cardBody.styles';

const useStyles = makeStyles(styles);

interface CardBodyProps {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  children?: React.ReactNode;
}

export default function CardBody(props: CardBodyProps) {
  const classes = useStyles({});
  const { className = '', children, plain, profile, ...rest } = props;
  const cardBodyClasses = classNames(className, {
    [classes.cardBody]: true,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyProfile]: profile,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}
