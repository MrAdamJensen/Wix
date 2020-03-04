/* @flow */

import React, { Component } from 'react';
import CRUDStore from '../flux-imm/CRUDStore';
import CRUDActions from '../flux-imm/CRUDActions';
import Dialog from './Dialog'
import Form from './Form'
import type {VoidMethod} from './ExcelWithFunc'
import ExcelWithFunc from './ExcelWithFunc'

// Initializing the store that will hold the schema of the to be submitted form
let crudStore = new CRUDStore({storeType: 'server', serverURL: window.location.href.concat("database/")})
let crudActions = new CRUDActions(crudStore)

/*
Special properties for CreatedForm
-------------------------------
submitActionActive: true if required that the submit action will be activated initially
*/
type Props = {
  submitActionActive: boolean,
};

/*
CreatedForm component displaying a page where you can submit a form
*/
class CreatedForm extends Component<Props> {
  // Setting the default values for the properties 
  static defaultProps = {
    submitActionActive: false,
  };

  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);
  }
  
  /*
  Submitting form
  */
  _submitForm(finishActionExecution: VoidMethod, action: string) {
    // Asserting action was to submit the form
    if (action === 'confirm') {
      // Retrieving submitted form
      let submittedForm = this.refs.excelWithFunc.refs.submittedForm.getData()
      
      // Creating new form submission
      crudActions.create(submittedForm)
    }

  // Finishing action
  finishActionExecution()
}
  /*
  Rendering component
  */
  render() {
    // Rendering
    return <ExcelWithFunc
            // Setting ref for easy access
            ref="excelWithFunc"           

            // If required that the submit action will be activated, set the initial action to 0
            // so that the submit form action will be activated
            initialActivatedAction={this.props.submitActionActive? 0 : undefined}

            // Setting the component data store and actions from which it will retrieve required
            // data
            crudStore={crudStore}
            crudActions={crudActions}

            // Setting the submit form action in ExcelWithFunc
            actions={[this._createSubmitFormAction.bind(this)]}
            actionsDefs={["Submit Form"]}
          /> 
  }

  /*
  Creating a submit form action to give the excel with functionality component
  */
 _createSubmitFormAction(finishActionExecution: VoidMethod) {
    return <Dialog 
              modal={true}                                                 
              header="Submit Form"                                          // Setting title 
              confirmLabel="Submit"                                         // Setting confirm button label
              onAction={this._submitForm.bind(this, finishActionExecution)} // Setting the callback to call when confirm button is clicked
            >  

              {/*Setting the form builder to provide the ability to create a form */}
              <Form 
                // Setting ref for easy access
                ref="submittedForm"

                // Override the read only globally attribute of all fields since the form
                // should be temporary editable for this action
                readOnlyGlobalOverride={false}

                // Setting the store from which the form will get the required form schema
                crudStore={crudStore} 
              />
            </Dialog>
  }
}


export default CreatedForm



