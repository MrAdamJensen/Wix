/* @flow */

import React from 'react';
import BasicField from './BasicField'
import type {Props} from './BasicField'

/*
ColorField component for picking a color
*/
class ColorField extends BasicField {
  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);
  }
  
  // Setting the default values for the properties 
  static defaultProps = {
    defaultValue: "#FF0000",
    readOnly: false,
  };

  /*
  Rendering component
  */
  render() {
    // Rendering
    return <input 
              type="color"                                                              // Setting the required type for this input
              defaultValue={this.props.defaultValue}                                    // Setting input default value
              id={this.props.id}  
              disabled={this.props.readOnly || this.props.disabled ? true : undefined}  // If readOnly, disable input
              onChange={this._onChange.bind(this)}                                      // Setting callback to update state on each change
          />  
  }
}
              
export default ColorField

