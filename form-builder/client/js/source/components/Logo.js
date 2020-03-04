/* @flow */

import React from 'react';

/*
Logo component for displaying a logo which can be configured in the
logo css file
*/
let Logo = function () {
    return <a href={window.location.origin.concat('/form_builder/')}> {/*Setting link to home*/} 
            <div className="Logo"/>
           </a>
}           
    
export default Logo

