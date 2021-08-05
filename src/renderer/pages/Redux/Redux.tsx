import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, connect } from "react-redux";
import Button from "../../components/CustomButtons/Button";
import { Input } from "@material-ui/core";

interface ActionType {
  type: string;

  [key: string]: any;
}

const middleware: any[] = [];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

// console.log(window.__REDUX_DEVTOOLS_EXTENSION__)


function counterReducer(state = { value: 0 }, action: ActionType) {
  switch ( action.type ) {
    case "counter/plus":
      return { value: state.value + 1 };
    case "counter/minus":
      return { value: state.value - 1 };
    default:
      return state;
  }
}


let store = createStore(counterReducer, composeEnhancers(applyMiddleware(...middleware)));

// logger
store.subscribe(() => console.log(store.getState()));

const Counter = connect(({ value }: any) => ( { value } ))(function (props: any) {
  return (
    <div>
      <Input value={props.value} readOnly type="number"/>
      <Button onClick={props.dispatch.bind(void 0, { type: "counter/plus" })}>PLUS</Button>
      <Button onClick={props.dispatch.bind(void 0, { type: "counter/minus" })}>MINUS</Button>
    </div>
  );
})

const Redux = function () {
  return (
    <Provider store={store}>
      <Counter/>
    </Provider>
  );
}

Redux.menu = {
  name: "Redux状态库",
  icon: "dashboard",
  sort: 1
}

export default Redux;

