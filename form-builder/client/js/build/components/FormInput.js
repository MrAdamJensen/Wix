'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RatingField = require('./RatingField');

var _RatingField2 = _interopRequireDefault(_RatingField);

var _NumberField = require('./NumberField');

var _NumberField2 = _interopRequireDefault(_NumberField);

var _SuggestField = require('./SuggestField');

var _SuggestField2 = _interopRequireDefault(_SuggestField);

var _ColorField = require('./ColorField');

var _ColorField2 = _interopRequireDefault(_ColorField);

var _DateField = require('./DateField');

var _DateField2 = _interopRequireDefault(_DateField);

var _EmailField = require('./EmailField');

var _EmailField2 = _interopRequireDefault(_EmailField);

var _TelField = require('./TelField');

var _TelField2 = _interopRequireDefault(_TelField);

var _TextField = require('./TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _ButtonField = require('./ButtonField');

var _ButtonField2 = _interopRequireDefault(_ButtonField);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Form Input component which displays a form input of certain types
*/


// Declaring form input field type, i.e, all the different kinds of forms


// Declaring form input field values, i.e, all the different kinds of values a form can receive


/*
Declaring form input field
-----------------------------
type: the type of the form field
defaultValue: the default value of the form field
id: the id of the form field, used to identify it with ref
options: the options for a form field that accept a set of options
label: the form field label
getForm: returning the inclosing form
disabled: set the input to be disabled if true
*/
var FormInput = function (_Component) {
  _inherits(FormInput, _Component);

  function FormInput() {
    _classCallCheck(this, FormInput);

    return _possibleConstructorReturn(this, (FormInput.__proto__ || Object.getPrototypeOf(FormInput)).apply(this, arguments));
  }

  _createClass(FormInput, [{
    key: 'getValue',


    /*
    Returning field value
    */

    // Component fields type definitions
    value: function getValue() {
      return this.refs.input.getValue();
    }

    /*
    Rendering component
    */


    // Setting the default values for the properties 

  }, {
    key: 'render',
    value: function render() {
      // Setting the common properties each component need to have 
      var commonProps = {
        id: this.props.id,
        ref: 'input',
        defaultValue: this.props.defaultValue,
        readOnly: this.props.readOnly,
        disabled: this.props.disabled ? true : undefined
      };

      // Creating field based on the form field type
      switch (this.props.type) {
        case 'rating':
          return _react2.default.createElement(_RatingField2.default // Creating a rating field type, a field with stars to pick a rating
          , _extends({}, commonProps, { // Inserting common properties
            getForm: this.props.getForm // Rating field need to communicate with the inclosing form
          }));
        case 'number':
          return _react2.default.createElement(_NumberField2.default // Creating a number field type, which is a filed that accept only numbers
          , commonProps);
        case 'suggest':
          return _react2.default.createElement(_SuggestField2.default // Creating a suggest field type, a field with options to select from
          , _extends({}, commonProps, { // Inserting common properties
            options: this.props.options // Setting options to select from
          }));
        case 'color':
          return _react2.default.createElement(_ColorField2.default // Creating a color field type, which is a field that accept only colors
          , commonProps);
        case 'date':
          return _react2.default.createElement(_DateField2.default // Creating a date field type, which is a field that accept only dates
          , commonProps);
        case 'email':
          return _react2.default.createElement(_EmailField2.default // Creating a email field type, which is a field that accept only emails
          , commonProps);
        case 'tel':
          return _react2.default.createElement(_TelField2.default // Creating a telephone type, which is a field that accept only telephones
          , commonProps);
        case 'text':
          return _react2.default.createElement(_TextField2.default // Creating a text type, which is a field that accept only text
          , commonProps);
        case 'button':
          return _react2.default.createElement(_ButtonField2.default // Creating a button type, which is a field that accept only text
          , _extends({}, commonProps, { // Inserting common properties
            label: this.props.label // Setting the button field label
          }));
        default:
          // Declaring unrecognized input type
          throw 'FormInput.render: bad input type ' + this.props.type;
      }
    }
  }]);

  return FormInput;
}(_react.Component);

FormInput.defaultProps = {
  type: 'text',
  options: [],
  readOnly: false,
  label: "",
  getForm: function getForm() {},
  disabled: false
};
exports.default = FormInput;