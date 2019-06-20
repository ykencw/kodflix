import React from 'react';

export default class AdminAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            synopsis: '',
            videoID: '',
            imageCover: '',
            imageBackground: ''
        }
    }
    render() {
        return(<div className='AdminAdd'>This is the Admin Add function
            
        </div>);
    }
}