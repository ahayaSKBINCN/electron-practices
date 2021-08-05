import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import "./assets/css/application.css";
import counter from "./models/counter";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./models/pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";

let store = configureStore({
  // 添加reducer
  reducer: {
    counter,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // 注入中间件
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});


setupListeners(store.dispatch);

// development

const DEV_EXCLUDES = [
  "findDOMNode is deprecated in StrictMode.",
  "%s is deprecated in StrictMode. %s",
  "Warning: Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code.",
  "Warning: Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code.",
]


type ImportMeta = {
  hot?: {
    accept: () => void
  }
}
const consoleError = console.error;

console.error = function (args) {
  let result = false;
  for ( let exclude of DEV_EXCLUDES ) {
    if ( args.includes(exclude) ) {
      result = true;
    }
  }
  if ( !result ) consoleError(args);
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));


// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
// if ( ( import.meta as ImportMeta ).hot ) {
//   ( import.meta as ImportMeta ).hot?.accept();
// }
