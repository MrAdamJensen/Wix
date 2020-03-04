/* @flow */

import {Component} from 'react';

/*
Special properties for DataField
-------------------------------
defaultValue" the data this field will hold
*/
type Props = {
  defaultValue: string
};

/*
DataField component for holding data while rendering as invisible
*/
class DataField extends Component<Props> {
  // Setting the default values for the properties 
  static defaultProps = {
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
    return null 
  }
}

export default DataField

