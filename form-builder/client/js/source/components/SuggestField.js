/* @flow */

import React, {Component} from 'react';

/*
Special properties for SuggestField
-------------------------------
id: component id
defaultValue: initial value
options: the options to suggest
*/
type Props = {
  id: string,
  defaultValue: string,
  options: Array<string>,
};

/*
SuggestField state fields:
----------------------------------------------------------------
value: current given value in input
*/
type State = {
  value: string,
};

/*
SuggestField component which is a regualr input field with suggestions
*/
class SuggestField extends Component<Props, State> {
  // Component fields type definitions
  props: Props;
  state: State;
  
  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);

    // Initializing component state
    this.state = {value: props.defaultValue || ''};
  }
  
  /*
  Returning input value
  */
  getValue(): string {
    return this.state.value;
  }
  
  /*
  Rendering component
  */
  render() {
    // Generating id for the suggest part
    const randomid: string = Math.random().toString(16).substring(2);

    // Rendering
    return (
      <div>                                                            {/*Creating suggest field */}

        {/*Creating the input field of the suggest field to enter the text*/}
        <input
          // Setting the id of the suggest field so that it will
          // receive the input text as it is enterd so that it can suggest                                                  
          list={randomid}                                         
          defaultValue={this.props.defaultValue}                       // Setting the default value of the input field part

          // Setting callback to update the state of the componenet as user types
          onChange={e => this.setState({value: e.target.value})}       
          id={this.props.id}                                           // Setting the id of the input part as the component id
        />

        {/*Creating the suggest part of suggest field to suggest options as user types */}
        <datalist                                                      
          id={randomid}                                                // Setting id to connect the input part to the suggest part
          >{             
          // Creating all possible suggested options                            
          this.props.options.map((item: string, idx: number) => 
            <option value={item} key={idx} />
          )
        }</datalist>
      </div>
    );
  }
}

export default SuggestField
