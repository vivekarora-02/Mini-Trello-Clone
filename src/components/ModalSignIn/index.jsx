import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import SignIn from '../SignIn';

export default class SignInPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailValue: '',
      isEmailValid: true // Initially, assume email is valid
    };

    this.root = document.createElement('div');
    this.root.className = 'signin container-fluid d-flex justify-content-center align-items-center';
    document.body.appendChild(this.root);
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  onChangeEmail = ({ target }) => {
    const emailValue = target.value;
    const isEmailValid = this.validateEmail(emailValue);
    this.setState({ emailValue, isEmailValid });
  };

  validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  render() {
    const { closeModalSignIn, children } = this.props;

    return createPortal(
      <SignIn
        onChangeEmail={this.onChangeEmail}
        {...this.props}
        {...this.state}
      />,
      this.root
    );
  }
}
