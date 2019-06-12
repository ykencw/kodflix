import React from 'react';
import TVOverlay from './TVOverlay';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

class TVSeries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvseries: []
        };
    }

    componentDidMount() {
        fetch(`/rest/tvseries`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(tvseries => {
            this.setState({tvseries});
        });
    }

    render() {
        return this.state.tvseries ?
            this.state.tvseries[0] ?
                <div className="showTitles">
                    <div className="container">
                        {
                            this.state.tvseries.map(item => (
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


export default TVSeries;