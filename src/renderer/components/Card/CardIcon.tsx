import React, { ReactNode } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import styles from '../../assets/jss/components/cardIcon.styles';

interface CardIconProps {
  className?: string;
  color?: ThemeColor;
  children?: ReactNode;
}

const useStyles = makeStyles(styles);
export default function CardIcon(props: CardIconProps) {
  const classes = useStyles({});
  const { className = '', children, color, ...rest } = props;
  const cardIconClasses = classNames(className, {
    [classes.cardIcon]: true,
    [classes[`${color}CardHeader`]]: color,
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}
