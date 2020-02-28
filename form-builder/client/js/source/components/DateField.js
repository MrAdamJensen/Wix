/* @flow */

import React from 'react';
import {BasicField, Props} from './BasicField'

/*
DateField component for picking a color
*/
class DateField extends BasicField {
  // Setting the default values for the properties 
  static defaultProps = {
    defaultValue: new Date().getFullYear(),
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
              type="date"                           {/*Setting the required type for this input */}
              {...props}                             {/*Setting all given properties to input*/}
              {props.readonly ? "disabled" : null}   {/*If readonly, disable input*/}
            />               
  }
}

export default DateField