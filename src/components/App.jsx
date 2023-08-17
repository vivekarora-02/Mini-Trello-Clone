import React, { Component } from 'react'

import GroupList from './Groups/GroupList'
import ModalSignIn from './ModalSignIn';
import Header from './Header';

export default class extends Component {
    constructor(props) {
        super(props);
        const storedEmail = localStorage.getItem('storedEmail') || '';
        this.state = {
            isUserSignIn: storedEmail,
            isModalOpen: false,
        };
    }


    toggleSignIn = () => {
        const { isUserSignIn, isModalOpen } = this.state;
    
        (isUserSignIn && !isModalOpen)
            ? this.setState({ isUserSignIn: '' })
            : this.setState({ isModalOpen: true })
    }

    handleLogin = (user) => {
        this.setState({
            isUserSignIn: user,
            isModalOpen: false,
        })
    }

    render() {
        console.log(this.state)
        const { isUserSignIn, isModalOpen } = this.state;

        return (
            <React.Fragment>

                <Header
                    isUserSignIn={isUserSignIn}
                    toggleSignIn={this.toggleSignIn}
                />
    
                <GroupList 
                    isUserSignIn={isUserSignIn}
                    flowUser={ (user) => this.setState({ isUserSignIn: user }) }
                />

                {isModalOpen
                    &&!isUserSignIn
                    &&<ModalSignIn closeModalSignIn={this.handleLogin} />
                }

            </React.Fragment>
        )
    }
}