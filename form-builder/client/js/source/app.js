/* @flow */

'use strict';

import CRUDStore from './flux-imm/CRUDStore';
import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';
import Whinepad from './components/Whinepad';

import classification from './classification';

let schema =  [
  {
    id: 'name',
    label: 'Name',
    show: true,
    sample: '$2 chuck',
    align: 'left',
  },
  {
    id: 'year',
    label: 'Year',
    type: 'year',
    show: true,
    sample: 2015,
  },
  {
    id: 'grape',
    label: 'Grape',
    type: 'suggest',
    options: classification.grapes, 
    show: true,
    sample: 'Merlot',
    align: 'left',
  },
  {
    id: 'rating',
    label: 'Rating',
    type: 'rating',
    show: true,
    sample: 3,
  },
  {
    id: 'comments',
    label: 'Comments',
    type: 'text',
    sample: 'Nice for the price',
  },
]

CRUDStore.init(schema);

ReactDOM.render(
  <div>
    <div className="app-header">
      <Logo /> Welcome to Whinepad!
    </div>
    <Whinepad />
  </div>,
  document.getElementById('pad')
);
