'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
BasicField component for basic input field
*/


/*
Special properties for BasicField
-------------------------------
defaultValue: the default value
readonly: does the value can be edited
*/


/*
BasicField state fields:
------------------------
value: current given value in input
*/
var BasicField = function (_Component) {
  _inherits(BasicField, _Component);

  /*
  Component constructor
  */

  // Component fields type definitions
  function BasicField(props) {
    _classCallCheck(this, BasicField);

    //Setting callback to update the state of the componenet as user types
    var _this = _possibleConstructorReturn(this, (BasicField.__proto__ || Object.getPrototypeOf(BasicField)).call(this, props));
    // Calling meta class constructor


    _this.props.onChange = function (e) {
      return _this.setState({ value: e.target.value });
    };

    // Initializing component state
    _this.state = { value: props.defaultValue };
    return _this;
  }

  /*
  Returning value
  */


  _createClass(BasicField, [{
    key: 'getValue',
    value: function getValue() {
      return this.state.value;
    }
  }]);

  return BasicField;
}(Component);

exports.default = { BasicField: BasicField, Props: Props, State: State };