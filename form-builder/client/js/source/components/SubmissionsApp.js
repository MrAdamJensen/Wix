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
    try {
      return <CreatedForm/>
    }
    catch (error) {
      // Declaring error occurred and refreshing page
      console.log(`An error occurred in SubmissionsApp:${error}`)
      location.reload();
      return null
    }
  }
}

export default SubmissionsApp

