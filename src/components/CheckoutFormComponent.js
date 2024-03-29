import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("/silver", {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    body: token.id
  });

  if (response.ok) console.log("Purchase Complete!");
  if (response.ok) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) {
      return (
        <div className="checkout">
          <p>Thank you! Purchase Completed!</p>
          <CardElement />
          <button onClick={this.submit}>Purchase</button>
        </div>
      );
    }
    else{
      return (
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Purchase</button>
        </div>
      );
    }
  }
}

export default injectStripe(CheckoutForm);