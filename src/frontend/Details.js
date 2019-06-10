import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import getTVSeries from './TVSeries-get';

import './Details.css';

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        };
    }

    componentDidMount() {
        let detailURL = this.props.match.params.details;
        let movie = getTVSeries().find(movie => detailURL === movie.id);
        this.setState({ movie });
    }

    render() {
        if (!this.state.movie) {
            return <Redirect to='/not-found' />;
        }
        return (
            <div className='Details'>
                <h1>{this.state.movie.title}</h1>
                    <div className='container'>
                        <div className='synopsis'><h3>Synopsis:</h3>{this.state.movie.synopsis}</div>
                        <img src={this.state.movie.source} alt={`${this.state.movie.title} logo`} />
                    </div>
                <Link to='/'><h1>Back to homepage!</h1></Link>
            </div>
        );
    }
}

export default Details;