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
FormBuilder component for giving the functionality to build forms and display
the created forms
*/
var FormBuilder = function (_Component) {
  _inherits(FormBuilder, _Component);

  /*
  Component constructor
  */
  function FormBuilder(props) {
    _classCallCheck(this, FormBuilder);

    // Calling meta class constructor
    return _possibleConstructorReturn(this, (FormBuilder.__proto__ || Object.getPrototypeOf(FormBuilder)).call(this, props));
  }

  /*
  Remove !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  */

  // Setting the default values for the properties 


  _createClass(FormBuilder, [{
    key: '_addNew',
    value: function _addNew(finishActionExecution, action) {
      if (action === 'confirm') {
        crudActions.create(this.refs.form.getData());
      }
    }

    /*
    Rendering component
    */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // Rendering
      return _react2.default.createElement(_ExcelWithFunc2.default, {
        crudStore: crudStore,
        crudActions: crudActions,
        actions: [function (finishActionExecution) {
          _react2.default.createElement(
            _Dialog2.default,
            {
              modal: true,
              header: 'Add new item',
              confirmLabel: 'Add',
              onAction: _this2._addNew.bind(_this2, finishActionExecution) },
            _react2.default.createElement(_Form2.default, {
              ref: 'form',
              crudStore: crudStore
            })
          );
        }],
        actionsDefs: ["add +"]
      });
    }
  }]);

  return FormBuilder;
}(_react.Component);

FormBuilder.defaultProps = {};
exports.default = FormBuilder;