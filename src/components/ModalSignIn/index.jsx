import React, { Component, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import SignIn from '../SignIn';


// const [items, setItems] = useState([]);
// const [items, setItems] = useState([]);

// useEffect(()=>{
//   localStorage.setItem('items', JSON.stringify(items));
// }, [items]);

// useEffect(()={
//   const items = JSON.parse(localStorage.getItem('items'));
//   if(items){
//     setItems(items);
//   }
// }, []);

export default class SignInPortal extends Component {

  constructor(props) {
    super(props);
    const storedEmail = localStorage.getItem('storedEmail') || '';
    console.log('Retrieved email:', storedEmail); // Add this line


    this.state = {
      emailValue: storedEmail,
      isEmailValid: this.validateEmail(storedEmail),
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
    this.setState({ isEmailValid });
    localStorage.setItem('storedEmail', emailValue);
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
