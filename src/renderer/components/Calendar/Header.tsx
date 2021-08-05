import React from "react";
import { WEEK_NAMES } from "./constant";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  thead: {},
  tr: {},
  td: {},
})

function Header() {
  const styles = useStyles();
  return (
    <thead className={styles.thead}>
    <tr className={styles.tr}>
      {
        WEEK_NAMES.map((week, key) => {
          return <td key={key} className={styles.td}>{week}</td>
        })
      }
    </tr>
    </thead>
  )
}

export default React.memo(Header, () => true);
