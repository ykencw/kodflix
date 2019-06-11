import React from 'react';
import TVOverlay from './TVOverlay';
import { Redirect } from 'react-router-dom';

class TVSeries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvseries: [],
            redirect: false
        };
    }

    componentDidMount() {
        fetch(`/rest/tvseries`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(tvseries => {
            this.setState({tvseries});
        }).catch(() => {
            this.setState({redirect: true});
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/not-found' />;
        }

        return (
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
            </div>
        );
    }
}


export default TVSeries;