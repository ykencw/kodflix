import React from 'react';
import * as forge from 'node-forge';
import { withRouter } from 'react-router-dom';

import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleInput = (name, value) => {
        this.setState(() => ({
            [name]: value
        }));
    }

    handleSubmit = event => {
        event.preventDefault();
        const md = forge.md.sha256.create();
        md.update(this.state.password);
        fetch(`/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: md.digest().toHex()
            })
        }).then(res => res.ok ? res.json() : Promise.reject())
            .then(res => {
                console.log("Result: " + Object.entries(res));
                if (res.result) { // Successful Login
                    this.props.showLoginBanner({
                        message: `Successful Login, welcome ${res.username}!`,
                        isSuccess: true
                    });
                    this.props.history.push('/');
                } else { // Fail with message from backend
                    this.props.showLoginBanner({
                        message: `${res.message}`,
                        isSuccess: false
                    });
                }
            })
            .catch();
    }

    render() {
        return (<div className='Login'><h1>Log in:</h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input name='username'
                    type='text'
                    onChange={({ target }) =>
                        this.handleInput(target.name, target.value)} />
                <label htmlFor='password'>Password:</label>
                <input name='password'
                    type='password'
                    onChange={({ target }) =>
                        this.handleInput(target.name, target.value)} />
                <input type='submit'
                    value='Log in' />
            </form>
        </div>);
    }
}

export default withRouter(Login);