/* @flow */

import React, {Component} from 'react';

/*
Special properties for BasicField
-------------------------------
defaultValue: the default value
readonly: does the value can be edited
*/
export type Props = {
  defaultValue: number | string,
  readonly: boolean,
  onChange: function
};

/*
BasicField state fields:
------------------------
value: current given value in input
*/
export type State = {
  value: string,
};

/*
BasicField component for basic input field
*/
class BasicField extends Component<Props, State> {
  // Component fields type definitions
  props: Props;
  state: State;
  
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

     //Setting callback to update the state of the componenet as user types
     this.props.onChange = e => this.setState({value: e.target.value})

    // Initializing component state
    if(typeof props.defaultValue !== 'undefined'){
      this.state = {value: props.defaultValue.toString()};
    }
  }
  
  /*
  Returning value
  */
  getValue(): (string | number){
    return this.state.value;
  }
}

export default BasicField
