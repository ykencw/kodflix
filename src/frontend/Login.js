import React from 'react';
import sha256 from 'crypto-js/sha256';

import './Login.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleUsername = event => {
        const username = event.target.value;
        this.setState(() => ({ username }));
    }

    handlePassword = event => {
        const input = event.target.value;
        console.log(`password input: ${input} sha: ${sha256(input)}`);
        this.setState(() => ({ password: input }));
    }

    handleSubmit = event => {
        event.preventDefault();
        fetch(`/login`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: sha256(this.state.password)
            })
        }).then(res => res.ok ? res : Promise.reject())
        .then(res => console.log("Result: " + res))
        .catch();
    }

    render() {
        return (<div className='Login'><h1>Log in:</h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input name='username'
                    type='text'
                    onChange={this.handleUsername} />
                <label htmlFor='password'>Password:</label>
                <input name='password'
                    type='password'
                    onChange={this.handlePassword} />
                <input type='submit'
                    value='Log in' />
            </form>
        </div>);
    }
}