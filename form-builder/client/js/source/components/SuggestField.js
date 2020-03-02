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
  readOnly: bool
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
SuggestField component which is a regular input field with suggestions
*/
class SuggestField extends Component<Props, State> {
  // Component fields type definitions
  props: Props;
  state: State;
  
  // Setting the default values for the properties 
  static defaultProps = {
    defaultValue: "",
    readOnly: false,
  };

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
  Updating state on props change
  */
  componentWillReceiveProps(nextProps : Props){
    if(nextProps.defaultValue !== this.props.defaultValue){
      this.setState({value: nextProps.defaultValue});
    }
  }

  /*
  Rendering component
  */
  render() {
    // Asserting field is read only, if yes render it as a simple span with a hidden input for the label,
    // otherwise, render it as input
    if (this.props.readOnly) {
      return this._renderReadOnly()
    }
    else {
      return this._renderInput()
    } 
  }

  /*
  Rendering component as readonly
  */
  _renderReadOnly() {
    // Render as a simple span with a hidden input for the label because readonly
    return (
      <div>
        <span>
          {this.state.value}
        </span>
        <input 
          {...(this.props: any)}
          type="hidden" 
        />
      </div>
    );
  }

  /*
  Rendering component as input
  */
  _renderInput() {
    // Generating id for the suggest part
    const randomID: string = Math.random().toString(16).substring(2);

    // Rendering as input because not read only
    return <div>                                                            {/*Creating suggest field */}
              {/*Creating the input field of the suggest field to enter the text*/}
              <input
                // Setting the id of the suggest field so that it will
                // receive the input text as it is entered so that it can suggest                                                  
                list={randomID}                                         
                defaultValue={this.props.defaultValue}                       // Setting the default value of the input field part

                // Setting callback to update the state of the component as user types
                onChange={e => this.setState({value: e.target.value})}       
                id={this.props.id}                                           // Setting the id of the input part as the component id
              />

              {/*Creating the suggest part of suggest field to suggest options as user types */}
              <datalist                                                      
                id={randomID}                                                // Setting id to connect the input part to the suggest part
                >{             
                // Creating all possible suggested options                            
                this.props.options.map((item: string, idx: number) => 
                  <option value={item} key={idx} />
                )
              }</datalist>
            </div>
  }
}

export default SuggestField
