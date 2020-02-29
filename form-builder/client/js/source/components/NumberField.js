/* @flow */

import React from 'react';
import BasicField from './BasicField'
import type {Props} from './BasicField'

/*
NumberField component for picking a number
*/
class NumberField extends BasicField {
  // Setting the default values for the properties 
  static defaultProps = {
    defaultValue: "0",
    readonly: false,
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
    // Rendering
    return <input 
              type="number"                                   // Setting the required type for this input
              {...(this.props: any)}                          // Setting all given properties to input
              {...(this.props.readonly ? "disabled" : null)}  // If readonly, disable input
          />  
  }
}

export default NumberField