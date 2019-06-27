import React from 'react';
import { Link } from 'react-router-dom';

import './AdminAdd.css';

export default class AdminAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                id: '',
                title: '',
                synopsis: '',
                videoID: '',
                imageCover: '',
                imageBackground: ''
            },
            enableSubmit: false
        };
    }

    handleInput = (name, value) => {
        this.setState(() => ({
            fields: { [name]: value }
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        fetch('/rest/admin/addTVShow', {
            method: 'post',
            credentials: 'include',
            body: formData
        }).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(res => {
            return res.result ? '' : ''; // send a nice response to let us know the tv show has been added
        });
    }

    render() {
        return (<div className='AdminAdd'>Please enter the details of the TV
            Show you would like to add:
            <form onSubmit={this.handleSubmit}>
                <fieldset><legend>TVShow</legend>
                    <div className='Fields'>
                        <InputField name='id'
                            required={true}
                            wantsImage={false}
                            placeholder={"Please enter an ID " +
                                "(lowercase, no spaces or symbols)"}
                            handle={({ target }) =>
                                this.handleInput(target.name, target.value)} />
                        <InputField name='title'
                            required={true}
                            wantsImage={false}
                            placeholder='Please enter the title of the tv show'
                            handle={({ target }) =>
                                this.handleInput(target.name, target.value)} />
                        <InputField name='synopsis'
                            required={false}
                            wantsImage={false}
                            placeholder={"Please enter a synopsis " +
                                "for the tv show"}
                            handle={({ target }) =>
                                this.handleInput(target.name, target.value)} />
                        <InputField name='videoID'
                            required={false}
                            wantsImage={false}
                            placeholder={"Please enter the video ID" +
                                "for the youtube trailer"}
                            handle={({ target }) =>
                                this.handleInput(target.name, target.value)} />
                        <InputField name='imageCover'
                            required={false}
                            wantsImage={true}
                            placeholder='Please add an image for the cover'
                            handle={({ target }) =>
                                this.handleInput(target.name, target.value)} />
                        <InputField name='imageBackground'
                            required={false}
                            wantsImage={true}
                            placeholder='Please add an image for the background'
                            handle={({ target }) =>
                                this.handleInput(target.name, target.value)} />
                    </div>
                    <input type='submit' value='Submit TVShow' />
                </fieldset>
                <label className='Required'>
                    <Asterisk />
                    Required field
                </label>
            </form>
            <Link to='./list' className='Return'>Return to Admin List</Link>
        </div>);
    }
}

const InputField = ({ name, required, wantsImage, placeholder, handle }) => {
    return (<>
        <label htmlFor={name}>
            {required ? <Asterisk /> : <></>}
            {name}:
        </label>
        <input type={wantsImage ? 'file' : 'text'}
            accept={wantsImage ? 'image/png, image/jpeg' : ''}
            name={name}
            placeholder={placeholder}
            onChange={handle} />
    </>);
}

const Asterisk = () => {
    return <img className='Asterisk'
        src={require(`../../common/images/asteriskicon.svg`)}
        alt={'Required Field'} />
}