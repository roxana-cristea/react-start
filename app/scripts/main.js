import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';

import Routes from './Routes';

ReactDOM.render(
  React.createElement(Routes),
  document.getElementById('app'),
);
