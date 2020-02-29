'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Retrieving document body element with checking not null invariant
*/
var retrieveDocBodyWithInv = function retrieveDocBodyWithInv() {
    // Asserting body is not null
    (0, _invariant2.default)(document.body, 'retrieveDocBodyWithInv: Document body is null');

    // Returning document body
    return document.body;
};

/*
Retrieving element by id
*/
/*flow*/

var retrieveElementByID = function retrieveElementByID(id) {
    // Retrieving element
    var elem = document.getElementById(id);

    // Asserting element retrieved successfully
    (0, _invariant2.default)(elem || elem === null, 'retrieveElementByID: element is null');

    return elem;
};

exports.default = { retrieveDocBodyWithInv: retrieveDocBodyWithInv, retrieveElementByID: retrieveElementByID };