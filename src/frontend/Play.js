import React from 'react';
import Loading from './Loading';
import { Redirect } from 'react-router-dom';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvshows: {}
        };
    }

    componentDidMount() {
        fetch(`/rest/tvshows/${this.props.match.params.tvshowsID}`
        ).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(tvshows => {
            this.setState({ tvshows });
        }).catch(() => {
            this.setState({ tvshows: undefined });
        });
    }

    render() {
        const { tvshows } = this.state;
        return tvshows ?
            tvshows.title ?
                <PlayPage tvshows={tvshows} /> :
                <Loading /> :
            <Redirect to='/not-found' />;
    }
}

const PlayPage = ({ tvshows }) => {
    return (<iframe
        title={tvshows.title}
        width='100%'
        height='100%'
        src={`https://www.youtube.com/embed/${
            tvshows.videoID}?autoplay=1&mute=1`}
    />);
}

export default Play;