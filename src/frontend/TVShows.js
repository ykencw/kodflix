import React from 'react';
import TVOverlay from './TVOverlay';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { tvshows } from './common/REST/get';

class TVShows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvshows: []
        };
    }

    componentDidMount() {
        tvshows().then(tvshows => {
            this.setState({ tvshows });
        });
    }

    render() {
        const { tvshows } = this.state;
        return tvshows ?
            tvshows[0] ?
                <div className="showTitles">
                    <div className="container">
                        {
                            tvshows.map(tvshow => (
                                <TVOverlay
                                    key={tvshow.id}
                                    id={tvshow.id}
                                    title={tvshow.title}
                                    synopsis={tvshow.synopsis}
                                    imageCover={tvshow.imageCover} />
                            ))
                        }
                    </div>
                </div> :
                <Loading /> :
            <Redirect to='/not-found' />;
    }
}


export default TVShows;