/* @flow */

import React from 'react';

type Props = {
  children: any
};

class Wrap extends React.Component<Props> {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Wrap
