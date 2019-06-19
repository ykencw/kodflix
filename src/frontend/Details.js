import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from './Loading';
import PlayButton from './PlayButton';

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
        const { tvseries } = this.state;
        return tvseries ?
            tvseries.title ? 
                <DetailsPage tvseries={tvseries} /> :
                <Loading /> :
            <Redirect to='/not-found' />;
    }
}

const DetailsPage = ({tvseries}) => {
    return (<div className='Details' style={
        {backgroundImage: `url(${require(`./common/images/wallpapers/${tvseries.id}.jpg`)})`}
    }>
        <div className='overlay'>
            <h1>{tvseries.title}</h1>
                <div className='container'>
                    <div className='synopsis'><h3>Synopsis:</h3>{tvseries.synopsis}</div>
                </div>
            <h4>Watch the trailer:</h4>
            <Link to={`${tvseries.id}/play`}>
                <PlayButton />
            </Link>
            <Link to='/'><h1>Back to homepage!</h1></Link>
        </div>
    </div>);
}

export default Details;