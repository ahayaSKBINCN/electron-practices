import React from "react";
import {default as CalendarComponent} from "../../components/Calendar";

function Calendar (){
  return ( <CalendarComponent/> );
}

( Calendar as MenuComponent<typeof Calendar> ).menu = {
  name: "日历",
  sort: 1,
  icon: "dashboard",
}


export default Calendar as MenuComponent<typeof Calendar>;

