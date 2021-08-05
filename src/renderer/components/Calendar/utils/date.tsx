import { MONTH_DAYS } from "../constant";

declare namespace DateUtils {
  let getMonth: (date: Date) => number;
  let getFullYear: (date: Date) => number;
  let getCurrentMonthDays: (month: number) => number;
  let getWeeksByFirstDay: (year: number, month: number) => number;
  let formatNumber: (num: number) => string;
  let getDateByYearMonth: (year: number, month: number, day?: number) => Date;
}


export function getMonth(date: Date): number {
  return date.getMonth();
}

export function getFullYear(date: Date): number {
  return date.getFullYear();
}

export function getCurrentMonthDays(month: number): number {
  return MONTH_DAYS[month]
}

export function getWeeksByFirstDay(year: number, month: number): number {
  const date = getDateByYearMonth(year, month)
  return date.getDay()
}

export function formatNumber(num: number): string {
  const _num = num + 1
  return _num < 10 ? `0${_num}` : `${_num}`
}

export function getDateByYearMonth(year: number, month: number, day: number = 1): Date {
  const date = new Date()
  date.setFullYear(year)
  date.setMonth(month, day)
  return date
}

class DateUtils {}

DateUtils.getMonth = getMonth
DateUtils.formatNumber= formatNumber;
DateUtils.getDateByYearMonth = getDateByYearMonth;
DateUtils.getCurrentMonthDays = getCurrentMonthDays;
DateUtils.getFullYear = getFullYear;
DateUtils.getWeeksByFirstDay = getWeeksByFirstDay;


export default DateUtils;

