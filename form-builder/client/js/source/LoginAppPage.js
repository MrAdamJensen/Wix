/* @flow */
'use strict';

import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './components/Utils'
import LoginApp from './components/LoginApp'

ReactDOM.render(
  <div>
    <div className="app-header">
      <Logo /> Login Page
    </div>
    <LoginApp/>
  </div>,
  Utils.retrieveElementByID('app')
);
