/* @flow */

import React, {Component} from 'react';
import classNames from 'classnames';

/*
Special properties for RatingField
-------------------------------
defaultValue: the default number of stars to highlight 
readonly: does the number of stars highlighted can be edited
max: number of stars to display
*/
type Props = {
  defaultValue?: number | string,
  readonly?: boolean,
  max?: number,
};

/*
RatingField state fields: 
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

    // If default value is string, convert it to int
    if(typeof props.defaultValue === 'string'){
      props.defaultValue = parseInt(props.defaultValue, 10)
    }
      
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

  /*
  Setting the real number of stars highlighted
  */
  setRating(rating: number) {
    this.setState({
      tmpRating: rating,
      rating: rating,
    });
  }

  /*
  Resetting the number of stars highlighted to the real value
  */
  reset() {
    this.setTemp(this.state.rating);
  }

  /*
  Executed when new properties are given so that when a new component 
  is created it will receive the new default value
  */
  componentWillReceiveProps(nextProps: Props) {
    this.setRating(nextProps.defaultValue);
  }
  
  /*
  Rendering component
  */
  render() {
    // Rendering stars
    stars = _renderStars()

    return (
      <div                                       {/*Rendering raiting */}
        {/*Setting classes for styling for when the component is in readonly mode and edit mode*/}
        className={classNames({                   
          'Rating': true,
          'RatingReadonly': this.props.readonly,
        })}
        onMouseOut={this.reset.bind(this)}      {/*Resetting highlighted stars to real value when the mouse is done hovering*/}
      >
        {stars}                                 {/*Rendering stars*/}
        {
        // If not readonly mode, render a hidden input so that the componenet can act like a real input
        this.props.readonly || !this.props.id   
          ? null 
          : <input 
              type="hidden" 
              id={this.props.id} 
              value={this.state.rating} />
        }
      </div>
    );
  }

  /*
  Rendering stars
  */
  _renderStars(){
    // Initializing
    const stars = [];

    // Rendering stars
    for (let i: number = 1; i <= this.props.max; i++) {
      // Rendering star
      stars.push(
        <span                                                              {/*Creating star*/}
          className={i <= this.state.tmpRating ? 'RatingOn' : null}        {/*Highlighting star if position is within temp rating*/}     
          key={i}                                                          {/*adding key becuase it is requested by react*/}
          onClick={!this.props.readonly && this.setRating.bind(this, i)}   {/*If no readonly, setting callback for changing real rating on click */}
          onMouseOver={!this.props.readonly && this.setTemp.bind(this, i)} {/*If no readonly, setting callback for changing temp rating on mous over*/} 
        >
          &#9734;                                                          {/*Creatig star symbol*/}
        </span>);
    }
  }
}

export default RatingField
