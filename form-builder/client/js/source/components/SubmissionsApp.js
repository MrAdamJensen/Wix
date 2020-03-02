/* @flow */

import React, { Component } from 'react';
import CRUDStore from '../flux-imm/CRUDStore';
import CRUDActions from '../flux-imm/CRUDActions';
import CreatedForm from './CreatedForm'

/*
Special properties for SubmissionsApp
-------------------------------
*/
type Props = {
};

/*
SubmissionsApp component displaying all form submissions
*/
class SubmissionsApp extends Component<Props> {
  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);
  }
  
  /*
  Rendering component
  */
  render() {
    // Rendering
    return <CreatedForm/>
  }
}

export default SubmissionsApp

