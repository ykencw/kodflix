import React from 'react';
import TVOverlay from './TVOverlay';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

class TVShows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvshows: []
        };
    }

    componentDidMount() {
        fetch(`/rest/tvshows`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(tvshows => {
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
                            tvshows.map(item => (
                                <TVOverlay
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    synopsis={item.synopsis} />
                            ))
                        }
                    </div>
                </div> :
                <Loading /> :
            <Redirect to='/not-found' />;
    }
}


export default TVShows;