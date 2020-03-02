/* @flow */

import React, {Component} from 'react';
import Button from './Button';

/*
Special properties for ButtonField
-------------------------------
defaultValue" the default value for the button href
*/
type Props = {
  label: string;
  defaultValue: string
};

/*
ButtonField component for acting as a field button which can't be edited
*/
class ButtonField extends Component<Props> {
  // Setting the default values for the properties 
  static defaultProps = {
    label: '',
    defaultValue: '',
  };
  
  /*
  Returning the default value given to simulate an actual input field
  */
  getValue() {
    return this.props.defaultValue
  }
  
  /*
  Rendering component
  */
  render() {
    // Rendering
    return <Button                       
            href={this.props.defaultValue} // Setting button link
            >
            {this.props.label}       {/*Setting button text*/}
            </Button>   
  }
}

export default ButtonField

