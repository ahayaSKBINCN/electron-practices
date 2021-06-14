import React from 'react';
import classNames from 'classnames';
// @material-ui/core components
import {
  FormControl,
  FormControlProps,
  InputLabel,
  InputProps,
  Input,
  FormLabelProps,
  makeStyles
} from '@material-ui/core';

// @material-ui/icons
import { Clear, Check } from '@material-ui/icons';
// core components
import styles from '../../assets/jss/components/input.styles';

const useStyles = makeStyles(styles);
export default function CustomInput(props: CustomInputProps) {
  const classes = useStyles({});
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
  } = props;
  const labelClasses = classNames({
    [` ${classes.labelRootError}`]: error,
    [` ${classes.labelRootSuccess}`]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });
  const Notice = error ? (
    <Clear className={`${classes.feedback} ${classes.labelRootError}`}/>
  ) : success ? (
    <Check className={`${classes.feedback} ${classes.labelRootSuccess}`}/>
  ) : null;
  return (
    <FormControl
      {...formControlProps}
      className={`${formControlProps?.className} ${classes.formControl}`}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
      />
      {Notice}
    </FormControl>
  );
}
CustomInput.defaultProps = {
  labelText: '',
  labelProps: {},
  id: '',
  inputProps: {},
  formControlProps: {},
  error: false,
  success: false,
};

export interface CustomInputProps {
  labelText?: string | Node;
  labelProps?: FormLabelProps;
  id?: string;
  inputProps?: InputProps;
  formControlProps?: FormControlProps;
  error?: boolean;
  success?: boolean;
}
