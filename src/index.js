import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css'
import 'font-awesome/css/font-awesome.min.css';
import { Provider } from "react-redux";

import store from './redux/store/listStore';
ReactDOM.render(
  <Provider  store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  
  document.getElementById('root')
);


