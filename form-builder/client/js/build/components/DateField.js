'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BasicField2 = require('./BasicField');

var _BasicField3 = _interopRequireDefault(_BasicField2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
DateField component for picking a color
*/
var DateField = function (_BasicField) {
  _inherits(DateField, _BasicField);

  /*
  Component constructor
  */
  function DateField(props) {
    _classCallCheck(this, DateField);

    // Calling meta class constructor
    return _possibleConstructorReturn(this, (DateField.__proto__ || Object.getPrototypeOf(DateField)).call(this, props));
  }

  // Setting the default values for the properties 


  _createClass(DateField, [{
    key: 'render',


    /*
    Rendering component
    */
    value: function render() {
      // Rendering with check if the field is in read only mode so that it can render
      // not an input if possible
      return this._renderWithReadOnlyCheck(_react2.default.createElement('input', {
        type: 'date' // Setting the required type for this input
        , onChange: this._onChange.bind(this) // Setting callback to update state on each change
        , id: this.props.id // Setting id for label
        , disabled: this.props.disabled // Setting disabled to disable input field if requested
        , defaultValue: this.props.defaultValue // Setting input default value
      }));
    }
  }]);

  return DateField;
}(_BasicField3.default);

DateField.defaultProps = {
  defaultValue: "",
  readOnly: false
};
exports.default = DateField;