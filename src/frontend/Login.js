import React from 'react';
import * as forge from 'node-forge';

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
        const md = forge.md.sha256.create();
        md.update(input);
        console.log(`password input: ${input} sha: ${md.digest().toHex()}`);
        this.setState(() => ({ password: input }));
    }

    handleSubmit = event => {
        event.preventDefault();
        const md = forge.md.sha256.create();
        md.update(this.state.password);
        fetch(`/login`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: md.digest().toHex()
            })
        }).then(res => res.ok ? res.json() : Promise.reject())
        .then(res => console.log("Result: " + Object.entries(res)))
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