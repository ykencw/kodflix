import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../../Loading';

import './AdminList.css';

export default class AdminList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvshows: [],
            tvshowToDelete: ''
        };
    }

    componentDidMount() {
        fetch(`/rest/tvshows`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(tvshows => {
            this.setState({ tvshows });
        });
    }

    deleteShow = tvshowID => {
        console.log("The id of the tvshow we want to delete is: " + tvshowID);
        this.setState(() => ({
            tvshowToDelete: tvshowID
        }));
    }

    render() {
        const { tvshows, tvshowToDelete } = this.state;
        return tvshows ?
            tvshows[0] ?
                <AdminListPage
                    tvshowToDelete={tvshowToDelete}
                    deleteShow={this.deleteShow}
                    tvshows={tvshows} /> :
                <Loading /> :
            <Redirect to='/not-found' />;
    }
}

const AdminListPage = ({ tvshowToDelete, deleteShow, tvshows }) => {
    return <div className='AdminList'>
        <div className='Header'>
            <h4>TVShows Database:</h4>
            <div className='ViewingCount'>
                {`Viewing ${0}-${tvshows.length} of ${tvshows.length}`}
            </div>
            <Link className='AddTVShow' to='./add'>
                <div>Add TVShow</div>
                <img className='icon'
                    src={require(`../../common/images/addicon.svg`)}
                    alt={'Add icon'} />
            </Link>
        </div>
        <TVList
            tvshowToDelete={tvshowToDelete}
            deleteShow={deleteShow}
            tvshows={tvshows} />
    </div>
}

const TVList = ({ tvshowToDelete, deleteShow, tvshows }) => {
    return (<table className='TVList'>
        <tr>
            {
                Object.keys(tvshows[0]).reduce((acc, k) => {
                    if (k === 'imageCover' || k === 'imageBackground') {
                        return acc;
                    }
                    return acc.concat(<th key={k}>{k}</th>);
                }, [])
            }
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        {
            tvshows.map((tvshow) => {
                return tvshowToDelete === tvshow.id ?
                    <tbody id='ToDelete'>{
                        tvshowRow(deleteShow, tvshow, true)
                    }</tbody> : 
                    tvshowRow(deleteShow, tvshow);
            })
        }
    </table>);
}

const tvshowRow = (deleteShow, tvshow, confirmDelete) => {
    return (<tr key={tvshow.id}>
        {
            Object.entries(tvshow).reduce((acc, kv) => {
                if (kv[0] === 'imageCover' || kv[0] === 'imageBackground') {
                    return acc;
                }
                return acc.concat(<td key={kv[0]}>{kv[1]}</td>);
            }, [])
        }
        <td>
            <img className='Edit icon'
                src={require(`../../common/images/editicon.svg`)}
                alt={'Edit icon'} />
        </td>
        {
            confirmDelete ?
                <td id='ConfirmDelete'>
                    <div className='DeleteItem' id='title'>Please confirm:</div>
                    <button className='DeleteItem' id='Cancel'>&#215; Cancel</button>
                    <button className='DeleteItem' id='Delete'>&#10004;  Delete</button>
                </td> :
                <td>
                    <img onClick={() => deleteShow(tvshow.id)}
                        className='Delete icon'
                        src={require(`../../common/images/deleteicon.svg`)}
                        alt={'Delete icon'} />
                </td>
        }
    </tr>
    );
}