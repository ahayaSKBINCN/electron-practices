import React from 'react';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  makeStyles,
} from '@material-ui/core';
import styles from '../../assets/jss/components/table.styles';

const useStyle = makeStyles(styles);
type Head = React.ReactText | React.ReactNode;

interface CustomTableProps {
  tableHeaderColor?: ThemeColor;
  tableHead: Head[];
  tableData: any[][];
}

export default function CustomTable(props: CustomTableProps) {
  const styles = useStyle({});
  const { tableHeaderColor = '', tableData, tableHead } = props;
  return (
    <div className={styles.tableResponsive}>
      <Table className={styles.table}>
        {tableHead !== undefined ? (
          <TableHead className={styles[`${tableHeaderColor}TableHeader`]}>
            <TableRow className={styles.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={`${styles.tableCell} ${styles.tableHeadCell}`}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((data = [], key) => {
            return (
              <TableRow key={`${key}`} className={styles.tableBodyRow}>
                {data!.map((prop, index) => {
                  return (
                    <TableCell className={styles.tableCell} key={`${index}`}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
