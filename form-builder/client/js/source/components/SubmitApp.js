/* @flow */

import React, { Component } from 'react';
import CRUDStore from '../flux-imm/CRUDStore';
import CRUDActions from '../flux-imm/CRUDActions';
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
    return <CreatedForm
              // Setting the form submitting action initially activated
              submitActionActive={true}
            />
  }
}

export default SubmitApp

