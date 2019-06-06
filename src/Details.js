import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import getGallery from './gallery-get';

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        };
    }

    componentDidMount() {
        let detailURL = this.props.match.params.details;
        let movie = getGallery().find(movie => detailURL === movie.id);
        this.setState({ movie });
    }

    render() {
        if (!this.state.movie) {
            return <Redirect to='/not-found' />;
        }
        return (
            <div>
                <h1>{this.state.movie.title}</h1>
                <Link to='/'><h1>Back to homepage!</h1></Link>
            </div>
        );
    }
}

export default Details;