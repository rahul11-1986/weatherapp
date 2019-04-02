import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import App from './App'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();

serviceWorker.unregister();
