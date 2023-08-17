import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function SignIn(props) {
  const { onChangeEmail, closeModalSignIn, emailValue, children } = props;

  // Retrieve email value from local storage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('storedEmail');
    if (storedEmail) {
      onChangeEmail({ target: { value: storedEmail } });
    }
  }, [onChangeEmail]);

  const handleSignIn = () => {
    // Save email value to local storage
    localStorage.setItem('storedEmail', emailValue);

    // Call the provided closeModalSignIn function
    closeModalSignIn(emailValue);
  };

  return (
    <div className="col-md-5 text-center">
      <h1>Trello</h1>
      <form>
        <div className="form-group">
          <input
            className="email form-control"
            type="email"
            placeholder="Email"
            value={emailValue}
            onChange={onChangeEmail}
          />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" placeholder="Password" />
        </div>
        <button onClick={handleSignIn} className="btn btn-primary btn-block">
          Sign in
        </button>
      </form>
      {children}
    </div>
  );
}
