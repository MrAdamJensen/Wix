/* @flow */

import React from 'react';
import {BasicField, Props} from './BasicField'\

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
              type="tel"                             {/*Setting the required type for this input */}
              {...props}                             {/*Setting all given properties to input*/}
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
              {props.readonly ? "disabled" : null}   {/*If readonly, disable input*/}
            />  
    }
}

export default TelField