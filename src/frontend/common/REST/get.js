export async function tvshows() {
    let res = await fetch(`/rest/tvshows`);
    let tvshows = await res.json();
    return tvshows.map(tvshow => {
        return stringifyTVShowImages(tvshow);
    });
}

export async function tvshow(tvshowID) {
    let res = await fetch(`/rest/tvshows/${tvshowID}`);
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
                    data: tvshow.imageCover.toString('base64')
                }
            }),
        ...(tvshow.imageBackground &&
            {
                imageBackground: {
                    mimetype: tvshow.imageBackground.mimetype,
                    data: tvshow.imageBackground.toString('base64')
                }
            })
    };
}