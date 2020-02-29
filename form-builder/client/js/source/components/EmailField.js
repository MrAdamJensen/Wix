/* @flow */

import React from 'react';
import BasicField from './BasicField'
import type {Props} from './BasicField'

/*
EmailField component for picking an email
*/
class EmailField extends BasicField {
  // Setting the default values for the properties 
  static defaultProps = {
    defaultValue: "johndo@gmail.com",
    readOnly: false,
  };
  
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
    // Rendering with check if the field is in read only mode so that it can render
    // not an input if possible
    return this._renderWithReadOnlyCheck(<input 
                                            type="email"                          // Setting the required type for this input
                                            {...(this.props: any)}               // Setting all given properties to input
                                            onChange={this._onChange.bind(this)} // Setting callback to update state on each change
                                          />)  
  }
}

export default EmailField

