import React from 'react';
import { Link } from 'react-router-dom';

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: 'Hello, this will be the details page for each show :)'
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                welcomeMessage:  'Coming soon!'
            });
        }, 3000);
    }

    render() {
        return (
            <div>
                <h1>{this.state.welcomeMessage}</h1>
                <Link to='/'><h1>Back to homepage!</h1></Link>
            </div>
        );
    }
}

export default Details;