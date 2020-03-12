/* @flow */

import React, { Component } from 'react';

/*
Special properties for LoginApp
-------------------------------
*/
type Props = {
};

/*
LoginApp component displaying a login page
*/
class LoginApp extends Component<Props> {
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
      return null
    }
    catch (error) {
      // Declaring error occurred and refreshing page
      console.log(`An error occurred in LoginApp:${error}`)
      location.reload();
      return null
    }
  }
}

export default LoginApp

