'use strict';

var _Logo = require('./components/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Utils = require('./components/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _SubmissionsApp = require('./components/SubmissionsApp');

var _SubmissionsApp2 = _interopRequireDefault(_SubmissionsApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(
    'div',
    { className: 'app-header' },
    _react2.default.createElement(_Logo2.default, null),
    ' Submissions App'
  ),
  _react2.default.createElement(_SubmissionsApp2.default, null)
), _Utils2.default.retrieveElementByID('app'));