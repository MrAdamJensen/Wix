'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
ButtonField component for acting as a field button which can't be edited
*/


/*
Special properties for ButtonField
-------------------------------
defaultValue" the default value for the button href
*/
var ButtonField = function (_Component) {
  _inherits(ButtonField, _Component);

  function ButtonField() {
    _classCallCheck(this, ButtonField);

    return _possibleConstructorReturn(this, (ButtonField.__proto__ || Object.getPrototypeOf(ButtonField)).apply(this, arguments));
  }

  _createClass(ButtonField, [{
    key: 'getValue',


    /*
    Returning the default value given to simulate an actual input field
    */
    value: function getValue() {
      return this.props.defaultValue;
    }

    /*
    Rendering component
    */

    // Setting the default values for the properties 

  }, {
    key: 'render',
    value: function render() {
      // Rendering
      return _react2.default.createElement(
        _Button2.default,
        {
          href: this.props.defaultValue // Setting button link
        },
        this.props.label,
        '       '
      );
    }
  }]);

  return ButtonField;
}(_react.Component);

ButtonField.defaultProps = {
  label: '',
  defaultValue: ''
};
exports.default = ButtonField;