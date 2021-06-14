import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import "./theme.css";

type ImportMeta = {
  hot?: {
    accept: () => void
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root'));


// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement

if ((import.meta as ImportMeta).hot ) {
  (import.meta as ImportMeta).hot?.accept();
}
