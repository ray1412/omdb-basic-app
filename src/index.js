import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from 'store'

import App from 'pages/main';
import reportWebVitals from 'reportWebVitals';

export const rootApp = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

export const rootElement = document.getElementById('root')

ReactDOM.render(
  rootApp,
  rootElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
