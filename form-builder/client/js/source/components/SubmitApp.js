/* @flow */

import React, { Component } from 'react';
import CreatedForm from './CreatedForm'

/*
Special properties for SubmitApp
-------------------------------
*/
type Props = {
};

/*
SubmitApp component displaying a form to submit
*/
class SubmitApp extends Component<Props> {
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
      return <CreatedForm
              // Setting the form submitting action initially activated
              submitActionActive={true}
             />
    }
    catch (error) {
      // Declaring error occurred and refreshing page
      console.log(`An error occurred in SubmitApp:${error}`)
      location.reload();
      return null
    }
  }
}

export default SubmitApp

