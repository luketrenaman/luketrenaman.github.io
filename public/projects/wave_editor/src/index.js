import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Button from './Button';
let data = [{
        "expanded":true,
        "id": "Wave-1",
        "delay": 2.5,
        "wave": [{
            "type":"enemy",
            "zombie": "normal",
            "intensity": 1,
            "amount": 5
        }, {
            "type":"enemy",
            "zombie": "normal",
            "intensity": 2,
            "amount": 5
        }]
    }]
ReactDOM.render(
  <React.StrictMode>
    <App data={data}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
