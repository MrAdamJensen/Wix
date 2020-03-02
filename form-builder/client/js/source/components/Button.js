/* @flow */

import React from 'react';
import classNames from 'classnames';

/*
Special properties for Button
-------------------------------
href: using href will transform button to a link
className: extra class names for css
*/
type Props = {
  href?: string,
  className?: string,
};

/* 
Button component which displays a button than can be clicked
If using href then it will be as a link
otherwise using a handler for interactions
*/
const Button = (props: Props) => 
  props.href
    ? <a {...props} className={classNames('Button', props.className)} />
    : <button {...props} className={classNames('Button', props.className)} />

export default Button
