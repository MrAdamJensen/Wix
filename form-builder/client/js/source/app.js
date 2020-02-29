/* @flow */
'use strict';

import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './components/Utils'
import FormBuilder from './components/FormBuilder'

ReactDOM.render(
  <div>
    <div className="app-header">
      <Logo /> Welcome to Form Builder!
    </div>
    <FormBuilder/>
  </div>,
  Utils.retrieveElementByID('pad')
);
