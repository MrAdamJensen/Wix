/* @flow */

import React, {Component} from 'react';
import ExcelWithFunc from './ExcelWithFunc'
import Dialog from './Dialog'
import Form from './Form'
import CRUDStore from '../flux-imm/CRUDStore';
import CRUDActions from '../flux-imm/CRUDActions';
import type {VoidMethod} from './ExcelWithFunc'

let classification =  {
  grapes: [
    'Baco Noir',
    'Barbera',
    'Cabernet Franc',
    'Cabernet Sauvignon',
    'Catawba',
    'Cayuga White',
    'Chambourcin',
    'Chancellor',
    'Chardonel',
    'Chardonnay',
    'Chelois',
    'Chenin Blanc',
    'Concord',
    'Delaware',
    'Frontenac',
    'Gewürztraminer',
    'Malbec',
    'Maréchal Fochr',
    'Merlot',
    'Norton',
    'Pinot Blanc',
    'Pinot Gris',
    'Pinot Noir',
    'Riesling',
    'Sangiovese',
    'Sauvignon Blanc',
    'Seyval Blanc',
    'Syrah',
    'Sémillon',
    'Traminette',
    'Vidal Blanc',
    'Vignoles',
    'Zinfandel',
  ], 
}

let schema =  [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    show: true,
    sample: '$2 chuck',
    align: 'left',
  },
  {
    id: 'year',
    label: 'Year',
    type: 'number',
    show: true,
    sample: 2015,
  },
  {
    id: 'grape',
    label: 'Grape',
    type: 'suggest',
    options: classification.grapes, 
    show: true,
    sample: 'Merlot',
    align: 'left',
  },
  {
    id: 'rating',
    label: 'Rating',
    type: 'rating',
    show: true,
    sample: 3,
  },
  {
    id: 'comments',
    label: 'Comments',
    type: 'text',
    sample: 'Nice for the price',
  },
]

let crudStore = new CRUDStore({storeType: 'local', schema:schema})
let crudActions = new CRUDActions(crudStore)

/*
Special properties for FormBuilder
-------------------------------
*/
type Props = {
};

/*
FormBuilder component for giving the functionality to build forms and display
the created forms
*/
class FormBuilder extends Component<Props> {
  // Setting the default values for the properties 
  static defaultProps = {
  };
  
  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);
  }
  
  /*
  Remove !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  */
  _addNew(finishActionExecution: VoidMethod, action: string) {
    if (action === 'confirm') {
      crudActions.create(this.refs.excelWithFunc.refs.form.getData());
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
            ref="excelWithFunc"
            crudStore={crudStore}
            crudActions={crudActions}
            actions={[this._createAction.bind(this)]}
            actionsDefs={["add +"]}
          /> 
  }

  _createAction(finishActionExecution: VoidMethod) {
    return <Dialog 
              modal={true}
              header="Add new item"
              confirmLabel="Add"
              onAction={this._addNew.bind(this, finishActionExecution)}>
              <Form 
                ref="form" 
                crudStore={crudStore}
              />
            </Dialog>
  }
}

export default FormBuilder

