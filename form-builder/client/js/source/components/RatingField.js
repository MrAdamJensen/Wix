/* @flow */

import React, {Component} from 'react';
import classNames from 'classnames';

/*
Special properties for Rating
-------------------------------
defaultValue: the default number of stars to highlight 
readonly: does the number of stars highlighted can be edited
max: number of stars to display
*/
type Props = {
  defaultValue: number,
  readonly: boolean,
  max: number,
};

/*
Rating state fields: 
----------------------------------------------------------------
rating: the number of stars highlighted
tmpRating: the number of stars temporary highlighted
*/
type State = {
  rating: number,
  tmpRating: number,
};

/*
Rating field component, displaying rating with stars highlighted
*/
class RatingField extends Component {
  // Component fields type definitions
  props: Props;
  state: State;
  
  // Setting the default values for the properties 
  static defaultProps = {
    defaultValue: 0,
    max: 5,
    readonly: false,
  };
  
  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);

    // Initializing component state
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue,
    };
  }
  
  /*
  Returning number of stars highlighted
  */
  getValue(): number {
    return this.state.rating;
  }
  
  /*
  Setting the number of stars temporary highlighted
  */
  setTemp(rating: number) {
    this.setState({tmpRating: rating});
  }

  setRating(rating: number) {
    this.setState({
      tmpRating: rating,
      rating: rating,
    });
  }

  reset() {
    this.setTemp(this.state.rating);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setRating(nextProps.defaultValue);
  }
 
  render() {
    const stars = [];
    for (let i: number = 1; i <= this.props.max; i++) {
      stars.push(
        <span 
          className={i <= this.state.tmpRating ? 'RatingOn' : null}
          key={i}
          onClick={!this.props.readonly && this.setRating.bind(this, i)}
          onMouseOver={!this.props.readonly && this.setTemp.bind(this, i)}
        >
          &#9734;
        </span>);
    }
    return (
      <div 
        className={classNames({
          'Rating': true,
          'RatingReadonly': this.props.readonly,
        })}
        onMouseOut={this.reset.bind(this)}
      >
        {stars}
        {this.props.readonly || !this.props.id
          ? null 
          : <input 
              type="hidden" 
              id={this.props.id} 
              value={this.state.rating} />
        }
      </div>
    );
  }  
}

export default RatingField
