import { Provider, connect } from "react-redux";
import React from "react";
import { Input } from "@material-ui/core";
import { minus, plus } from "../../models/counter";

import Button from "../../components/CustomButtons/Button";


const Counter: any = connect(({ counter }: any) => ( { ...counter } ))(function (props: any) {
  return (
    <div>
      <Input value={props.value} readOnly type="number"/>
      <Button onClick={() => props.dispatch(plus())}>PLUS</Button>
      <Button onClick={() => props.dispatch(minus())}>MINUS</Button>
    </div>
  );
})


Counter.menu = {
  name: "Toolkit 状态库",
  icon: "dashboard",
  sort: 2,
}

export default Counter;
