import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from './Loading';
import PlayButton from './PlayButton';

import './Details.css';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvshow: {}
        };
    }

    componentDidMount() {
        fetch(`/rest/tvshows/${this.props.match.params.details}`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(tvshow => {
            this.setState({ tvshow });
        }).catch(() => {
            this.setState({ tvshow: undefined });
        });
    }

    render() {
        const { tvshow } = this.state;
        return tvshow ?
            tvshow.title ?
                <DetailsPage tvshow={tvshow} /> :
                <Loading /> :
            <Redirect to='/not-found' />;
    }
}

const DetailsPage = ({ tvshow }) => {
    return (<div
        className='Details'
        style={{backgroundImage:
            `url(${require(`./common/images/wallpapers/${tvshow.id}.jpg`)})`}
        }>
        <div className='overlay'>
            <h1>{tvshow.title}</h1>
            <div className='container'>
                <div className='synopsis'>
                    <h3>Synopsis:</h3>{tvshow.synopsis}
                </div>
            </div>
            <h4>Watch the trailer:</h4>
            <Link to={`${tvshow.id}/play`}>
                <PlayButton />
            </Link>
            <Link to='/'><h1>Back to homepage!</h1></Link>
        </div>
    </div>);
}

export default Details;