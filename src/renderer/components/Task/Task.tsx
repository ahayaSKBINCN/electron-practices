import React, { ReactNode } from 'react';
import classnames from 'classnames';
// @material-ui/core components
import { makeStyles, Checkbox, Tooltip, IconButton, Table, TableRow, TableBody, TableCell } from '@material-ui/core';
// @material-ui/icons
import { Edit, Close, Check } from "@material-ui/icons"
// core components
import styles from '../../assets/jss/components/tasks.styles';

interface TasksProps {
  tasksIndexes: number[];
  tasks: ReactNode[];
  checkedIndexes: number[];
}

const useStyles = makeStyles(styles);
export default function Tasks(props: TasksProps) {
  const classes = useStyles({});
  const { checkedIndexes } = props;
  const [ checked, setChecked ] = React.useState([ ...checkedIndexes ]);
  const handleToggle = (value: number) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [ ...checked ];
    if ( currentIndex === -1 ) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const { tasksIndexes, tasks } = props;
  const tableCellClasses = classnames(classes.tableCell);
  return (
    <Table className={classes.table}>
      <TableBody>
        {tasksIndexes.map((value) => (
          <TableRow key={value} className={classes.tableRow}>
            <TableCell className={tableCellClasses}>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                onClick={() => handleToggle(value)}
                checkedIcon={<Check className={classes.checkedIcon}/>}
                icon={<Check className={classes.uncheckedIcon}/>}
                classes={{
                  checked: classes.checked,
                  root: classes.root,
                }}
              />
            </TableCell>
            <TableCell className={tableCellClasses}>{tasks[value]}</TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top"
                title="Edit Task"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                >
                  <Edit
                    className={`${classes.tableActionButtonIcon} ${classes.edit}`}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                id="tooltip-top-start"
                title="Remove"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Close"
                  className={classes.tableActionButton}
                >
                  <Close
                    className={`${classes.tableActionButtonIcon} ${classes.close}`}
                  />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
