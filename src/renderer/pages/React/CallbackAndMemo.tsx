import React, { ChangeEvent, useCallback } from "react";
import { Input } from "@material-ui/core";
import Button from "../../components/CustomButtons/Button";


type TypedChangeEvent = ChangeEvent & { target: EventTarget & { value: string } };

const Callback = function () {
  const [ state, $state ] = React.useState<string>("");
  const alertEvent = useCallback(function alertEvent(){
    const date = new Date().toLocaleString();
    alert(state + date);
  }, [ state ]);

  const handleChange = function ({ target: { value } }: TypedChangeEvent) {
    $state(value)
  }

  return (
    <div>
      <Input value={state} onChange={handleChange}/>
      <Button onClick={alertEvent} color="primary">Alert_Event</Button>
    </div>
  )
}

const Memo = function () {
  const [ state, $state ] = React.useState<string>("");
  const alertEvent = React.useCallback(() => {
    alert(state);
  }, [ state ]);
  const handleChange = function ({ target: { value } }: TypedChangeEvent) {
    $state(value)
  }

  return (
    <div>
      <Input value={state} onChange={handleChange}/>
      <Button onClick={alertEvent} color="primary">Alert_event</Button>
    </div>
  )
}

const CallbackAndMemo = function () {
  return (
    <div>
      <p>Callback</p>
      <Callback/>
      <p>Memo</p>
      <Memo/>
    </div>
  )
}

CallbackAndMemo.menu = {
  name: "回调或缓存",
  icon: "explicit",
  sort: 4,
}

export default CallbackAndMemo;
