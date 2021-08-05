import React from "react";
import { makeStyles } from "@material-ui/core";
import DateUtils from "./utils/date";
import { primaryColor } from "../../assets/jss/theme";

// default box with 50px default height box 40px

interface CalendarCaptionProps {
  onMonthChange: (val: number) => void;
  onYearChange: (val: number) => void;

  year: number;
  month: number;
}

const useStyles = makeStyles({
  "caption-header": {
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    width:"100%",
  },

  arrow: {
    cursor: "pointer",
    fontSize: 22,
    letterSpacing: 15,
    lineHeight: "22px",
    color:primaryColor[2],
  },
  title: {
    fontSize: 22,
    letterSpacing: 18,
    lineHeight: "22px",
    fontWeight: 600,
  },
  scope:{
    margin:"0 15px",
    color: primaryColor[0]
  }
})


export default function Caption(props: CalendarCaptionProps) {
  const {
    onMonthChange,
    onYearChange,
    year,
    month
  } = props;
  const styles = useStyles();

  function addYear() {
    onYearChange(1);
  }

  function minusYear() {
    onYearChange(-1);
  }

  function addMonth() {
    onMonthChange(1);
  }

  function minusMonth() {
    onMonthChange(-1);
  }

  return (
    <caption>
      <div className={styles["caption-header"]}>
        <div className={styles.scope}>
          <span className={styles.arrow} onClick={minusYear}>&#60;</span>
          <span className={styles.title}>{year}</span>
          <span className={styles.arrow} onClick={addYear}>&gt;</span>
        </div>
        <div className={styles.scope}>
          <span className={styles.arrow} onClick={minusMonth}>&#60;</span>
          <span className={styles.title}>{DateUtils.formatNumber(month)}</span>
          <span className={styles.arrow} onClick={addMonth}>&gt;</span>
        </div>
      </div>
    </caption>
  )
}
