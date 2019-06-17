import React from 'react';
import Loading from './Loading';
import { Redirect } from 'react-router-dom';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvseries: {}
        };
    }
    
    componentDidMount() {
        fetch(`/rest/tvseries/${this.props.match.params.tvseriesID}`).then(res => {
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
            <PlayPage tvseries={this.state.tvseries} /> :
            <Loading /> :
        <Redirect to='/not-found' />;
    }
}

const PlayPage = ({tvseries}) => {
    return(<iframe 
        title={tvseries.title}
        width='100%'
        height='100%'
        src={`https://www.youtube.com/embed/${tvseries.videoID}?autoplay=1&mute=1`}
    />);
}

export default Play;