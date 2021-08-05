import React from "react";
import { makeStyles } from "@material-ui/core";
import * as DateUtils from "./utils/date";
import Caption from "./Caption";
import Header from "./Header";
import Body from "./Body";

export * as DateUtils from "./utils/date";

declare namespace Calendar {
  interface Props {

  }

  interface State {
    month: number;
    year: number;
    currentDate: Date;
  }
}

type CalendarProps = Calendar.Props;
type CalendarState = Calendar.State;

const useStyles = makeStyles({
  container:{
    userSelect:"none"
  }
})


const initialState = function (): CalendarState {
  const currentDate = new Date();
  const month = DateUtils.getMonth(currentDate);
  const year = DateUtils.getFullYear(currentDate);
  return {
    currentDate,
    month,
    year,
  }
}

function Calendar(props: CalendarProps) {
  const [ state, $state ] = React.useState<CalendarState>(initialState);
  const styles = useStyles();
  const getDayText = React.useCallback(function getDayText(line: number, weekIndex: number, weekDay: number, monthDays: number) {
    const number = line * 7 + weekIndex - weekDay + 1;
    if ( number <= 0 || number > monthDays ) {
      return <span>&nbsp;</span>
    }
    return number;
  }, [])
  const checkToday = React.useCallback(function checkToDay(line: number, weekIndex: number, weekDay: number, monthDays: number) {
    const { year, month } = state
    const day = getDayText(line, weekIndex, weekDay, monthDays)
    const date = new Date()
    const todayYear = date.getFullYear()
    const todayMonth = date.getMonth()
    const todayDay = date.getDate()

    return year === todayYear && month === todayMonth && day === todayDay
  }, [])
  const monthChange = React.useCallback(function monthChange(changedMonth: number) {
    const { month, year } = state
    const monthAfter = month + changedMonth
    const date = DateUtils.getDateByYearMonth(year, monthAfter)
    $state({
      year: DateUtils.getFullYear(date),
      month: DateUtils.getMonth(date),
      currentDate: date
    })
  }, [ state.month, state.year ])
  const yearChange = React.useCallback(function yearChange(changedYear: number) {
    const { year, month } = state;
    const yearAfter = year + changedYear;
    const date = DateUtils.getDateByYearMonth(yearAfter, month);
    $state({
      year: DateUtils.getFullYear(date),
      month: DateUtils.getMonth(date),
      currentDate: date,
    })
  }, [ state.year,state.month ])

  return (
    <div className={styles.container}>
      <table cellPadding={10} cellSpacing={5} className="table">
        <Caption onMonthChange={monthChange} year={state.year} month={state.month} onYearChange={yearChange}/>
        <Header/>
        <Body checkToday={checkToday} month={state.month} year={state.year} getDayText={getDayText}/>
      </table>
    </div>
  );
}

export default Calendar;
