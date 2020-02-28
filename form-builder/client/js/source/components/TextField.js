/* @flow */

import React from 'react';
import {BasicField, Props} from './BasicField'\

/*
TextField component writing text
*/
class TextField extends BasicField {
  // Setting the default values for the properties 
  static defaultProps = {
      defaultValue: "",
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
              type="text"                             {/*Setting the required type for this input */}
              {...props}                             {/*Setting all given properties to input*/}
              {props.readonly ? "disabled" : null}   {/*If readonly, disable input*/}
            />  
    }
}

export default TextField