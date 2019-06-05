import React from 'react';
import { Link } from 'react-router-dom';
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
        return (
            <div>
                <h1>{this.state.movie.title}</h1>
                <Link to='/'><h1>Back to homepage!</h1></Link>
            </div>
        );
    }
}

export default Details;