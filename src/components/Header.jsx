import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function Header(props) {
    const { isUserSignIn, toggleSignIn } = props;

    // Retrieve the email from local storage
    const storedEmail = localStorage.getItem('storedEmail') || 'Guest';

    return (
        <header className="main__header container-fluid clearfix">
            <h2 className="logo">Trello</h2>
            <div className="info float-right">
                <div className="user">
                    {isUserSignIn ? storedEmail : 'Guest'}
                </div>
                <button onClick={toggleSignIn} className="btn btn-primary">
                    {isUserSignIn ? 'Sign out' : 'Sign in'}
                </button>
            </div>
        </header>
    );
}
