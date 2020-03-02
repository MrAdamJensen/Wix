'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CreatedForm = require('./CreatedForm');

var _CreatedForm2 = _interopRequireDefault(_CreatedForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
SubmissionsApp component displaying all form submissions
*/


/*
Special properties for SubmissionsApp
-------------------------------
*/
var SubmissionsApp = function (_Component) {
  _inherits(SubmissionsApp, _Component);

  /*
  Component constructor
  */
  function SubmissionsApp(props) {
    _classCallCheck(this, SubmissionsApp);

    // Calling meta class constructor
    return _possibleConstructorReturn(this, (SubmissionsApp.__proto__ || Object.getPrototypeOf(SubmissionsApp)).call(this, props));
  }

  /*
  Rendering component
  */


  _createClass(SubmissionsApp, [{
    key: 'render',
    value: function render() {
      // Rendering
      return _react2.default.createElement(_CreatedForm2.default, null);
    }
  }]);

  return SubmissionsApp;
}(_react.Component);

exports.default = SubmissionsApp;