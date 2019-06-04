import React from 'react';
import TVOverlay from './TVOverlay';
import getGallery from './gallery-get';

function Gallery() {
    return (
        <div className="showTitles">
            <div className="container">
                {
                    getGallery().map(item => (
                        <TVOverlay 
                            key={item.id}
                            id={item.id} 
                            source={item.source} 
                            title={item.title} />
                    ))
                }
            </div>
        </div>
    );
}


export default Gallery;