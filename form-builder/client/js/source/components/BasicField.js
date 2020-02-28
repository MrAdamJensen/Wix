/* @flow */

import React from 'react';

/*
Special properties for BasicField
-------------------------------
defaultValue: the default value
readonly: does the value can be edited
*/
type Props = {
  defaultValue?: number | string,
  readonly?: boolean,
};

/*
BasicField state fields:
------------------------
value: current given value in input
*/
type State = {
  value: string,
};

/*
BasicField component for basic input field
*/
class BasicField extends Component<Props, State> {
  // Component fields type definitions
  props: Props;
  state: State;
  
  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);

     //Setting callback to update the state of the componenet as user types
     this.props.onChange = e => this.setState({value: e.target.value})

    // Initializing component state
    this.state = {value: props.defaultValue};
  }
  
  /*
  Returning value
  */
  getValue(): (string | number){
    return this.state.value;
  }
}

export default {BasicField, Props, State}