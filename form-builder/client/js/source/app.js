/* @flow */
'use strict';

import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './components/Utils'
import FormBuilderApp from './components/FormBuilderApp'

ReactDOM.render(
  <div>
    <div className="app-header">
      <Logo /> Welcome to Form Builder App!
    </div>
    <FormBuilderApp/>
  </div>,
  Utils.retrieveElementByID('pad')
);
