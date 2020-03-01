/* @flow */

import React, {Component} from 'react';
import classNames from 'classnames';
import invariant from 'invariant';

/*
Special properties for RatingField
-------------------------------
defaultValue: the default number of stars to highlight 
readOnly: does the number of stars highlighted can be edited
max: number of stars to display
getForm: returning the inclosing form
*/
type Props = {
  defaultValue: number | string,
  readOnly: boolean,
  max: number,
  id: string,
  getForm: () => any
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
class RatingField extends Component<Props, State> {
  // Component fields type definitions
  props: Props;
  state: State;
  defaultValue: number

  // Setting the default values for the properties 
  static defaultProps = {
    defaultValue: 3,
    max: 5,
    readOnly: false,
  };
  
  /*
  Component constructor
  */
  constructor(props: Props) {
    // Calling meta class constructor
    super(props);
    
    // If default value is string, convert it to int
    // otherwise, just save it
    if (typeof props.defaultValue === 'string') {
      this.defaultValue = parseInt(props.defaultValue, 10)
    }
    else{
      this.defaultValue = props.defaultValue
    }
    
    console.log(JSON.stringify(props))
    
    // Asserting default value initialized
    //invariant(this.defaultValue, "RatingField.constructor: default value not initialized")

    // Initializing component state
    this.state = {
      rating: this.defaultValue,
      tmpRating: this.defaultValue,
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
    // Updating rating
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
    // If default value is string, convert it to int
    // Otherwise, just save it
    if (typeof nextProps.defaultValue === 'string') {
      this.defaultValue = parseInt(nextProps.defaultValue, 10)
    }
    else{
      this.defaultValue = nextProps.defaultValue
    }
    
    // Asserting default value initialized
    invariant(this.defaultValue, "RatingField.constructor: default value not initialized")

    // Updating number of stars highlighted
    this.setRating(this.defaultValue);
  }
  
  /*
  Rendering component
  */
  render() {
    // Rendering stars
    let stars = this._renderStars()
    
    return (
      <div                                       // Rendering rating
        // Setting classes for styling for when the component is in readOnly mode and edit mode
        className={classNames({                  
          'Rating': true,
          'RatingReadonly': this.props.readOnly,
        })}
        onMouseOut={this.reset.bind(this)}      // Resetting highlighted stars to real value when the mouse is done hovering
      >
        {stars}                                 {/*Rendering stars*/}
        {
        // If not readOnly mode, render a hidden input so that the component can act like a real input
        this.props.readOnly || !this.props.id   
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
  _renderStars() {
    // Initializing
    const stars = [];

    // Rendering stars
    for (let i: number = 1; i <= this.props.max; i++) {
      // Rendering star
      stars.push(
        // // Creating star
        <span  
          // Highlighting star if position is within temp rating
          className={i <= this.state.tmpRating ? 'RatingOn' : null} 
          
          // adding key because it is requested by react
          key={i}                                    
          
          // If no readOnly, setting callback for changing real rating on click
          onClick={this.props.readOnly ? undefined : this.setRating.bind(this, i)}  
          
          // If no readOnly, setting callback for changing temp rating on mouse over 
          onMouseOver={this.props.readOnly ? undefined : this.setRating.bind(this, i)} 

          // If double click, then trigger the inclosing form submit event
          onDoubleClick={() => {this.props.getForm() ? this.props.getForm().dispatchEvent(new Event('submit')) : null}}
        >
          &#9734;                                                          {/*Creating star symbol*/}
        </span>);
    }

    return stars
  }
}

export default RatingField
