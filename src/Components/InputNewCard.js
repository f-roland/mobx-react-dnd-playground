import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
class InputNewCard extends Component {

  constructor(props) {
    super(props);
    this.state = { input: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  render() {
    return (
      <div className="border p1 flex">
        <input type="text"
               placeholder="type the new card label here"
               className="flex-auto m1 p1"
               value={ this.state.input }
               onChange={ this.handleChange }
                onKeyPress={ this.handleKeyPress }/>
        <button type="submit"
                className="m2"
                onClick={ this.handleSubmit }>
          add new card
        </button>
      </div>
    )
  }

  handleSubmit() {
    if (!this.state.input) {
      alert('field is empty !');
      return;
    }
    console.log(this.state.input);
    const { store } = this.props;
    store.addCard(this.state.input);
    this.setState({ input: '' });
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  }
}

export default InputNewCard;
