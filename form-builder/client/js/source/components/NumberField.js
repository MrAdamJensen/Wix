/* @flow */

import React from 'react';
import BasicField from './BasicField'
import type {Props} from './BasicField'

/*
NumberField component for picking a number
*/
class NumberField extends BasicField {  
  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);
  }
  
  // Setting the default values for the properties 
  static defaultProps = {
    defaultValue: '0',
    readOnly: false,
  };

  /*
  Rendering component
  */
  render() {
    // Rendering with check if the field is in read only mode so that it can render
    // not an input if possible
    return this._renderWithReadOnlyCheck(<input 
                                            type="number"                                   // Setting the required type for this input
                                            id={this.props.id}                              // Setting id for label
                                            disabled={this.props.disabled}                  // Setting disabled to disable input field if requested
                                            defaultValue={this.props.defaultValue}          // Setting input default value
                                            onChange={this._onChange.bind(this)}            // Setting callback to update state on each change
                                          />)  
  }
}

export default NumberField

