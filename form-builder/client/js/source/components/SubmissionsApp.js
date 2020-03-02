/* @flow */

import React, { Component } from 'react';
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

