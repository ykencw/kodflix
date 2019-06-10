import React from 'react';
import TVOverlay from './TVOverlay';
import getTVSeries from './TVSeries-get';

function TVSeries() {
    return (
        <div className="showTitles">
            <div className="container">
                {
                    getTVSeries().map(item => (
                        <TVOverlay 
                            key={item.id}
                            id={item.id} 
                            source={item.source} 
                            title={item.title}
                            synopsis={item.synopsis} />
                    ))
                }
            </div>
        </div>
    );
}


export default TVSeries;