import React from "react";
import { LINES, WEEK_NAMES } from "./constant";
import * as dateUtils from "./utils/date";

interface TableBodyProps {
  checkToday: (key: number, index: number, weekDay: number, monthDays: number) => Boolean;
  getDayText: (line: number, weekIndex: number, weekDay: number, monthDays: number) => number | JSX.Element;
  month: number;
  year: number;

}

function Body(props: TableBodyProps) {

  const {
    month,
    year,
    checkToday,
    getDayText
  } = props;

  const monthDays = dateUtils.getCurrentMonthDays(month)
  const weekDay = dateUtils.getWeeksByFirstDay(year, month)

  return ( <tbody>
  {
    LINES.map((l, key) => {
      return <tr key={key}>
        {
          WEEK_NAMES.map((week, index) => {
            return <td key={index}
                       style={{ color: checkToday(key, index, weekDay, monthDays) ? 'red' : '#000' }}>
              {getDayText(key, index, weekDay, monthDays)}
            </td>
          })
        }
      </tr>
    })
  }
  </tbody> )
}


export default React.memo(Body);
