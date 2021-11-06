import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from './redux/store';
import App from "./App";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./assets/css/reset.css";
import "./index.scss";


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
