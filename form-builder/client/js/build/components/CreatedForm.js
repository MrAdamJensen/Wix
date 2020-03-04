'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CRUDStore = require('../flux-imm/CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _CRUDActions = require('../flux-imm/CRUDActions');

var _CRUDActions2 = _interopRequireDefault(_CRUDActions);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _ExcelWithFunc = require('./ExcelWithFunc');

var _ExcelWithFunc2 = _interopRequireDefault(_ExcelWithFunc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Initializing the store that will hold the schema of the to be submitted form
var crudStore = new _CRUDStore2.default({ storeType: 'server', serverURL: window.location.href.concat("database/") });
var crudActions = new _CRUDActions2.default(crudStore);

/*
Special properties for CreatedForm
-------------------------------
submitActionActive: true if required that the submit action will be activated initially
*/

/*
CreatedForm component displaying a page where you can submit a form
*/
var CreatedForm = function (_Component) {
  _inherits(CreatedForm, _Component);

  /*
  Component constructor
  */
  function CreatedForm(props) {
    _classCallCheck(this, CreatedForm);

    // Calling meta class constructor
    return _possibleConstructorReturn(this, (CreatedForm.__proto__ || Object.getPrototypeOf(CreatedForm)).call(this, props));
  }

  /*
  Submitting form
  */

  // Setting the default values for the properties 


  _createClass(CreatedForm, [{
    key: '_submitForm',
    value: function _submitForm(finishActionExecution, action) {
      // Asserting action was to submit the form
      if (action === 'confirm') {
        // Retrieving submitted form
        var submittedForm = this.refs.excelWithFunc.refs.submittedForm.getData();

        // Creating new form submission
        crudActions.create(submittedForm);
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
      return _react2.default.createElement(_ExcelWithFunc2.default
      // Setting ref for easy access
      , { ref: 'excelWithFunc'

        // If required that the submit action will be activated, set the initial action to 0
        // so that the submit form action will be activated
        , initialActivatedAction: this.props.submitActionActive ? 0 : undefined

        // Setting the component data store and actions from which it will retrieve required
        // data
        , crudStore: crudStore,
        crudActions: crudActions

        // Setting the submit form action in ExcelWithFunc
        , actions: [this._createSubmitFormAction.bind(this)],
        actionsDefs: ["Submit Form"]
      });
    }

    /*
    Creating a submit form action to give the excel with functionality component
    */

  }, {
    key: '_createSubmitFormAction',
    value: function _createSubmitFormAction(finishActionExecution) {
      return _react2.default.createElement(
        _Dialog2.default,
        {
          modal: true,
          header: 'Submit Form' // Setting title 
          , confirmLabel: 'Submit' // Setting confirm button label
          , onAction: this._submitForm.bind(this, finishActionExecution) // Setting the callback to call when confirm button is clicked
        },
        _react2.default.createElement(_Form2.default
        // Setting ref for easy access
        , { ref: 'submittedForm'

          // Override the read only globally attribute of all fields since the form
          // should be temporary editable for this action
          , readOnlyGlobalOverride: false

          // Setting the store from which the form will get the required form schema
          , crudStore: crudStore
        })
      );
    }
  }]);

  return CreatedForm;
}(_react.Component);

CreatedForm.defaultProps = {
  submitActionActive: false
};
exports.default = CreatedForm;