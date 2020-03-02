/* @flow */
'use strict';

import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './components/Utils'
import SubmitApp from './components/SubmitApp'

ReactDOM.render(
  <div>
    <div className="app-header">
      <Logo /> Form Submissions Page
    </div>
    <SubmitApp/>
  </div>,
  Utils.retrieveElementByID('app')
);
