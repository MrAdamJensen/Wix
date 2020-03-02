/* @flow */
'use strict';

import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './components/Utils'
import SubmissionsApp from './components/SubmissionsApp'

ReactDOM.render(
  <div>
    <div className="app-header">
      <Logo /> Submissions App
    </div>
    <SubmissionsApp/>
  </div>,
  Utils.retrieveElementByID('app')
);
