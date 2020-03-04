/* @flow */

import React from 'react';
import BasicField from './BasicField'
import type {Props} from './BasicField'

/*
TelField component for picking a telephone number
*/
class TelField extends BasicField {
  /*
  Component constructor
  */
  constructor(props: Props) {
      // Calling meta class constructor
      super(props);
  }

  // Setting the default values for the properties 
  static defaultProps = {
    defaultValue: "",
    readOnly: false,
  };

  /*
  Rendering component
  */
  render() {
    // Rendering with check if the field is in read only mode so that it can render
    // not an input if possible
    return this._renderWithReadOnlyCheck(<input 
                                            type="tel"                                     // Setting the required type for this input
                                            id={this.props.id}                             // Setting id for label
                                            disabled={this.props.disabled}                 // Setting disabled to disable input field if requested
                                            defaultValue={this.props.defaultValue}         // Setting input default value
                                            onChange={this._onChange.bind(this)}           // Setting callback to update state on each change
                                            placeholder="123-45-678"                       // Setting placeholder to inform on the tel patten
                                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"           // Setting a tel pattern
                                          />)   
    }
}

export default TelField

