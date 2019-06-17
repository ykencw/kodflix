import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from './Loading';

import './Details.css';

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tvseries: {}
        };
    }

    componentDidMount() {
        fetch(`/rest/tvseries/${this.props.match.params.details}`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(tvseries => {
            this.setState({tvseries});
        }).catch(() => {
            this.setState({tvseries: undefined});
        });
    }

    render() {
        return this.state.tvseries ?
            this.state.tvseries.title ? 
                <div className='Details'>
                    <h1>{this.state.tvseries.title}</h1>
                        <div className='container'>
                            <div className='synopsis'><h3>Synopsis:</h3>{this.state.tvseries.synopsis}</div>
                            <img src={require(`./common/images/${this.state.tvseries.id}.jpg`)} alt={`${this.state.tvseries.title} logo`} />
                        </div>
                    <Link to='/'><h1>Back to homepage!</h1></Link>
                </div> :
                <Loading /> :
            <Redirect to='/not-found' />;
    }
}

export default Details;