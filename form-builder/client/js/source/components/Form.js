/* @flow */

import CRUDStore from '../flux-imm/CRUDStore';
import FormInput from './FormInput';
import Rating from './Rating';
import React, {Component} from 'react';

import type {FormInputField, FormInputFieldValue} from './FormInput';

/*
Special properties for Form
-------------------------------
readonly: true if the form should be editable
recordId: the id of data to be displayed in the form
crudStore: the CRUD store from which to retrieve the data
*/
type Props = {
  readonly?: boolean,
  recordId: ?number,
  crudStore: CRUDStore,
};

/*
Form component
*/
class Form extends Component<Props> {
  // Component fields type definitions
  fields: Array<Object>;
  initialData: ?Object;
  crudStore: CRUDStore;

  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);

    // Retrieving the store and store actions objects
    this.crudStore = props.crudStore;
  // Retrieving form schema
    this.fields = this.crudStore.getSchema();

    // If a record id for the form is being given, initializing form with the data
    // that belongs to the record id
    if ('recordId' in this.props) {
      this.initialData = this.crudStore.getRecord(this.props.recordId);
    }
  }
  
  /*
  Returning form data
  */
  getData(): Object {
    // Initializing data to be returned
    let data: Object = {};

    // Retrieving each form field data and setting it in data to be returned
    this.fields.forEach((field: FormInputField) => 
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
        {this.fields.map(this._renderFormField, this)} {/*Rendering all form fields*/}
      </form>
    );
  }

  /*
  Rendering a form field
  */
  _renderFormField(field: FormInputField){
    // Retrieving field prefilled data
    const prefilled: FormInputFieldValue = (this.initialData && this.initialData[field.id]) || 'was not filled';

    // If form field is not readonly, render it as an editable field
    if (!this.props.readonly) {
      return this._renderInputField(field, prefilled)
    }

    // If form field is readonly, render it as a regular text field or as 
    // a special field
    return this._renderReadOnlyField(field, prefilled)
  }

  /*
  Rendering read only field
  */
  _renderInputField(field: FormInputField, prefilled: FormInputFieldValue){
    return (
      <div 
        className="FormRow"                   {/*Adding class for styling of form field*/}
        key={field.id}>                       {/*adding key becuase it is requested by react*/}
        <label                                {/*Setting form field label */}                             
          className="FormLabel"               {/*Setting form field label class for styling*/}  
          htmlFor={field.id}>                 {/*Setting form field label for element id to be a label for*/} 
            {field.label}:                    {/*Setting form field label text*/}
        </label>   
        <FormInput                            {/*Setting form field as an editable field*/}
          {...field}                          {/*Setting field properties*/}
          ref={field.id}                      {/*Settign field ref so that it can be accessed easily*/}
          defaultValue={prefilled} />         {/*Setting field default value*/}
      </div>
    );
  }

  /*
  Rendering read only field
  */
  _renderReadOnlyField(field: FormInputField, prefilled: FormInputFieldValue){
    return (
      <div 
        className="FormRow"                                  {/*Adding class for styling of form field*/}     
        key={field.id}>                                      {/*adding key becuase it is requested by react*/}
        <span                                                {/*Setting form field label */}
          className="FormLabel">                             {/*Setting form field label class for styling*/}  
          {field.label}:                                     {/*Setting form field label text*/}
        </span>
        {
          //Setting form field as a regular text or as a special form field
          // if special form field(Rating), creating a special form field
          field.type === 'rating'                           
            ? <Rating                                       {/*Creating special form field Rating*/}
                readonly={true}                             {/*Setting readonly to true since this field is readonly*/}
                defaultValue={parseInt(prefilled, 10)}      {/*Setting field default value*/}
              />   
            : <div>                                        {/*Setting regular form field as a regular text*/}
                {prefilled}                                
              </div>
        }
      </div>
    );
  }
}

export default Form
