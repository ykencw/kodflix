export async function tvshows(headers = {}) {
    let res = await fetch(`/rest/tvshows`, {
        headers
    });
    let tvshows = await res.json();
    return tvshows.map(tvshow => {
        return stringifyTVShowImages(tvshow);
    });
}

export async function tvshow(tvshowID, headers = {}) {
    let res = await fetch(`/rest/tvshows/${tvshowID}`, {
        headers
    });
    let tvshow = await res.json();
    return stringifyTVShowImages(tvshow);
}

function stringifyTVShowImages(tvshow) {
    return {
        ...tvshow,
        ...(tvshow.imageCover &&
            {
                imageCover: {
                    mimetype: tvshow.imageCover.mimetype,
                    data: tvshow.imageCover.data.toString('base64')
                }
            }),
        ...(tvshow.imageBackground &&
            {
                imageBackground: {
                    mimetype: tvshow.imageBackground.mimetype,
                    data: tvshow.imageBackground.data.toString('base64')
                }
            }),
        ...(tvshow.thumbCover &&
            {
                thumbCover: {
                    mimetype: tvshow.thumbCover.mimetype,
                    data: tvshow.thumbCover.data.toString('base64')
                }
            }),
        ...(tvshow.thumbBackground &&
            {
                thumbBackground: {
                    mimetype: tvshow.thumbBackground.mimetype,
                    data: tvshow.thumbBackground.data.toString('base64')
                }
            })
    };
}