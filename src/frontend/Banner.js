import React from 'react';

import './Banner.css'

export default class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: true
        };
        this.props.hideBanner();
    }

    componentDidMount() {
        this.props.attachRef(this);
    }

    componentWillUnmount() {
        this.props.attachRef(undefined);
    }

    resetAnimation = () => {
        this.setState({ animate: false },
            () => setTimeout(() => this.setState({ animate: true }), 100)
        );
    }

    render() {
        const { banner } = this.props;
        const { message, isSuccess } = banner;
        return (
            <div className={
                `Banner 
                ${this.state.animate ? 'Animating' : ''} 
                ${isSuccess ? 'Success' : 'Fail'}`}>{
                    message
                }</div>
        );
    }
}