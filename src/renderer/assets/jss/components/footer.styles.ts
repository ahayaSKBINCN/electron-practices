import { Theme } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';
import {
  defaultFont,
  container,
  primaryColor,
  grayColor,
} from '../theme';

const footerStyle: Styles<Theme, Record<string, unknown>, string> = {
  block: {
    color: 'inherit',
    padding: '15px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    textDecoration: 'none',
    position: 'relative',
    display: 'block',
    ...defaultFont,
    fontWeight: 500,
    fontSize: '12px',
  },
  left: {
    float: 'left!important' as any,
    display: 'block',
  },
  right: {
    padding: '15px 0',
    margin: '0',
    fontSize: '14px',
    float: 'right!important' as any,
  },
  footer: {
    bottom: '0',
    borderTop: `1px solid ${grayColor[11]}`,
    padding: '15px 0',
    ...defaultFont,
  },
  container,
  a: {
    color: primaryColor as any,
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0',
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0px',
    width: 'auto',
  },
};
export default footerStyle;
