/*flow*/

import invariant from 'invariant';

/*
Retrieving document body element with checking not null invariant
*/
retrieveDocBodyWithInv = function() : HTMLBodyElement{
    // Asserting body is not null
    invariant(document.body, 'retrieveDocBodyWithInv: Document body is null');

    // Returning document body
    return document.body
}

export default {retrieveDocBodyWithInv}