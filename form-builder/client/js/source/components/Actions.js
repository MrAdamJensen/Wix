/* @flow */

import React from 'react';

/*
Special properties for Actions
-------------------------------
onAction: callback to execute when an action button is clicked
*/
type Props = {
  onAction: Function,
};

/*
Actions component to allow info, edit and delete actions
callback will be called with a string argument identifying 
the action requested: 'info', 'edit' and 'delete'
*/
const Actions = (props: Props) =>
  <div className="Actions">
    <span 
      tabIndex="0"
      className="ActionsInfo"
      title="More info"
      onClick={props.onAction.bind(null, 'info')}>&#8505;</span>
    <span 
      tabIndex="0" 
      className="ActionsEdit" 
      title="Edit"
      onClick={props.onAction.bind(null, 'edit')}>&#10000;</span>
    <span 
      tabIndex="0"
      className="ActionsDelete"
      title="Delete"
      onClick={props.onAction.bind(null, 'delete')}>x</span>
  </div>

Actions.defaultProps = {
  onAction: () => {},
};

export default Actions

