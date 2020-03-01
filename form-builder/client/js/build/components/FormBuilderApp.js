'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ExcelWithFunc = require('./ExcelWithFunc');

var _ExcelWithFunc2 = _interopRequireDefault(_ExcelWithFunc);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _CRUDStore = require('../flux-imm/CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _CRUDActions = require('../flux-imm/CRUDActions');

var _CRUDActions2 = _interopRequireDefault(_CRUDActions);

var _FormBuilder = require('./FormBuilder');

var _FormBuilder2 = _interopRequireDefault(_FormBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classification = {
  grapes: ['Baco Noir', 'Barbera', 'Cabernet Franc', 'Cabernet Sauvignon', 'Catawba', 'Cayuga White', 'Chambourcin', 'Chancellor', 'Chardonel', 'Chardonnay', 'Chelois', 'Chenin Blanc', 'Concord', 'Delaware', 'Frontenac', 'Gewürztraminer', 'Malbec', 'Maréchal Fochr', 'Merlot', 'Norton', 'Pinot Blanc', 'Pinot Gris', 'Pinot Noir', 'Riesling', 'Sangiovese', 'Sauvignon Blanc', 'Seyval Blanc', 'Syrah', 'Sémillon', 'Traminette', 'Vidal Blanc', 'Vignoles', 'Zinfandel']
};

var schema = [{
  id: 'name',
  label: 'Name',
  type: 'text',
  show: true,
  sample: '$2 chuck',
  align: 'left'
}, {
  id: 'year',
  label: 'Year',
  type: 'number',
  show: true,
  sample: 2015
}, {
  id: 'grape',
  label: 'Grape',
  type: 'suggest',
  options: classification.grapes,
  show: true,
  sample: 'Merlot',
  align: 'left'
}, {
  id: 'rating',
  label: 'Rating',
  type: 'rating',
  show: true,
  sample: 3
}, {
  id: 'comments',
  label: 'Comments',
  type: 'text',
  sample: 'Nice for the price'
}];

var crudStore = new _CRUDStore2.default({ storeType: 'local', schema: schema });
var crudActions = new _CRUDActions2.default(crudStore);

/*
Special properties for FormBuilder
-------------------------------
*/

/*
FormBuilderApp component for giving the functionality to build forms and display
the created forms
*/
var FormBuilderApp = function (_Component) {
  _inherits(FormBuilderApp, _Component);

  /*
  Component constructor
  */
  function FormBuilderApp(props) {
    _classCallCheck(this, FormBuilderApp);

    // Calling meta class constructor
    return _possibleConstructorReturn(this, (FormBuilderApp.__proto__ || Object.getPrototypeOf(FormBuilderApp)).call(this, props));
  }

  /*
  Adding form
  */

  // Setting the default values for the properties 


  _createClass(FormBuilderApp, [{
    key: '_addForm',
    value: function _addForm(finishActionExecution, action) {
      if (action === 'confirm') {
        console.log(this.refs.excelWithFunc.refs.form.getCreatedForm());
      }

      // Finishing action
      finishActionExecution();
    }

    /*
    Rendering component
    */

  }, {
    key: 'render',
    value: function render() {
      // Rendering
      return _react2.default.createElement(_ExcelWithFunc2.default, {
        ref: 'excelWithFunc',
        crudStore: crudStore,
        crudActions: crudActions,
        actions: [this._createCreateFormAction.bind(this)],
        actionsDefs: ["Create Form"]
      });
    }
  }, {
    key: '_createCreateFormAction',
    value: function _createCreateFormAction(finishActionExecution) {
      return _react2.default.createElement(
        _Dialog2.default,
        {
          modal: true,
          header: 'Create new form',
          confirmLabel: 'Create',
          onAction: this._addForm.bind(this, finishActionExecution) },
        _react2.default.createElement(_FormBuilder2.default, {
          ref: 'form'
        })
      );
    }
  }]);

  return FormBuilderApp;
}(_react.Component);

FormBuilderApp.defaultProps = {};
exports.default = FormBuilderApp;