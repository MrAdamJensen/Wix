/* @flow */

import React from 'react';
import BasicField from './BasicField'
import type {Props} from './BasicField'

/*
TelField component for picking a telephone number
*/
class TelField extends BasicField {
  // Setting the default values for the properties 
  static defaultProps = {
      defaultValue: "123-45-678",
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
              type="tel"                                      // Setting the required type for this input
              {...(this.props: any)}                          // Setting all given properties to input
              {...(this.props.readonly ? "disabled" : null)}  // If readonly, disable input
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
      
            />  
    }
}

export default TelField