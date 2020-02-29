/*flow*/

import invariant from 'invariant';

/*
Retrieving document body element with checking not null invariant
*/
let retrieveDocBodyWithInv = function() : HTMLBodyElement {
    // Asserting body is not null
    invariant(document.body, 'retrieveDocBodyWithInv: Document body is null');

    // Returning document body
    return document.body
}

/*
Retrieving element by id
*/
let retrieveElementByID = function(id: string): HTMLElement {
    // Retrieving element
    let elem = document.getElementById(id)

    // Asserting element retrieved successfully
    invariant(elem || elem === null, 'retrieveElementByID: element is null');
    
    return elem
}

export default {retrieveDocBodyWithInv, retrieveElementByID}

