import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import styles from '../../assets/jss/components/cardHeader.styles';

const useStyles = makeStyles(styles);

interface CardHeaderProps {
  className?: string;
  color?: ThemeColor;
  plain?: boolean;
  icon?: boolean;
  stats?: boolean;
  children?: React.ReactNode;
}

export default function CardHeader(props: CardHeaderProps) {
  const classes = useStyles({});
  const {
    className = '',
    children,
    color,
    plain,
    stats,
    icon,
    ...rest
  } = props;
  const cardHeaderClasses = classNames(className, {
    [classes.cardHeader]: true,
    [classes[`${color}CardHeader`]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}
