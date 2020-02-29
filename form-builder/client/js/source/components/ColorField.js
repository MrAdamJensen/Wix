/* @flow */

import React from 'react';
import BasicField from './BasicField'
import type {Props} from './BasicField'

/*
ColorField component for picking a color
*/
class ColorField extends BasicField {
  // Setting the default values for the properties 
  static defaultProps = {
    defaultValue: "#ff0000",
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
    // Rendering
    return <input 
              type="color"                                    // Setting the required type for this input
              {...(this.props: any)}                          // Setting all given properties to input
              {...(this.props.readOnly ? "disabled" : null)}  // If readOnly, disable input
              onChange={this._onChange.bind(this)}            // Setting callback to update state on each change
          />  
  }
}

export default ColorField

