/* @flow */

import CRUDStore from '../flux-imm/CRUDStore';
import FormInput from './FormInput';
import React, {Component} from 'react';
import {List} from 'immutable';

import type {FormInputField, FormInputFieldValue} from './FormInput';

/*
Special properties for Form
-------------------------------
readOnly: true if the form should be editable
recordId: the id of data to be displayed in the form
crudStore: the CRUD store from which to retrieve the data
disabled: set the input to be disabled if true
*/
type Props = {
  readOnly: boolean,
  recordId: number,
  crudStore: CRUDStore,
  disabled: boolean,
};

/*
Form component which displays a form
*/
class Form extends Component<Props> {
  // Setting the default values for the properties 
  static defaultProps = {
    readOnly: false,
    recordId: -1,
    disabled: false,
  };

  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);
  }
  
  /*
  Returning form data
  */
  getData(): Object {
    // Initializing data to be returned
    let data: Object = {};
    
    // Retrieving each form field data and setting it in data to be returned
    this.props.crudStore.getSchema().forEach((field: FormInputField) => 
      data[field.id] = this.refs[field.id].getValue()
    );
    return data;
  }
  
  /*
  Rendering form
  */
  render() {
    return (
      <form className="Form">
        {this.props.crudStore.getSchema().map(this._renderFormField, this)} {/*Rendering all form fields*/}
      </form>
    );
  }

  /*
  Rendering a form field
  */
  _renderFormField(field: FormInputField) {
    // Initializing
    let initialData;

    // If a record id for the form is being given, initializing form with the data
    // that belongs to the record id
    if (this.props.recordId !== -1) {
      initialData = this.props.crudStore.getRecord(this.props.recordId);
    }

    // Retrieving field prefilled data
    const prefilled = (initialData && initialData[field.id]);

    // Rendering form field
    return (
      <div 
        className="FormRow"                   // Adding class for styling of form field
        key={field.id}>                       {/*adding key because it is requested by react*/}
        <label                                // Setting form field label                            
          className="FormLabel"               // Setting form field label class for styling
          htmlFor={field.id}>                 {/*Setting form field label for element id to be a label for*/} 
            {field.label}:                    {/*Setting form field label text*/}
        </label>   
        <FormInput                            // Setting form field as an editable field
          readOnly={this.props.readOnly}      // Setting field readonly or not based on properties
          disabled={this.props.disabled}        // Setting field disable or not based on properties
          {...field}                          // Setting field properties
          ref={field.id}                      // Setting field ref so that it can be accessed easily
          defaultValue={prefilled} />         {/*Setting field default value*/}
      </div>
    );
  }
}

export default Form
