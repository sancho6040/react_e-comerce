// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


import React from 'react';
import * as dom from "react-dom/client"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './context/UserContext';

const root = dom.createRoot(document.getElementById('root'));

root.render(
  <UserContext>
    <App />
  </UserContext>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
