import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../../Loading';
import { tvshows } from '../../common/REST/get';

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
        tvshows({
            'KYK-Excludes': 'imageCover;imageBackground'
        }).then(tvshows => {
            this.setState({ tvshows });
        });
    }

    prepareDelete = tvshowID => {
        console.log("The id of the tvshow we want to delete is: " + tvshowID);
        this.setState(() => ({
            tvshowToDelete: tvshowID
        }));
    }

    deleteShow = () => {
        const { tvshowToDelete } = this.state;
        fetch(`/rest/admin/delete/${tvshowToDelete}`, {
            method: 'delete'
        }).then(res => res.ok ? res.json() : Promise.reject()
        ).then(res => {
            console.log(res)
            if (res.result) {
                const remainingTVShows = this.state.tvshows.filter(tvshow => {
                    return tvshow.id !== tvshowToDelete;
                });
                this.setState(() => ({
                    tvshows: remainingTVShows,
                    tvshowToDelete: undefined
                }));
                this.showSuccessBanner(res.message);
            } else {
                this.showFailBanner(res.message);
            }
        }).catch(err => {
            this.showFailBanner(err);
            console.log(err)
        });
    }

    showSuccessBanner = message => {
        this.props.showNewBanner({
            message,
            isSuccess: true
        });
    }

    showFailBanner = reason => {
        this.props.showNewBanner({
            message: `Failed to delete TVShow: ${reason}`,
            isSuccess: false
        });
    }

    cancelDelete = () => {
        this.setState(() => ({
            tvshowToDelete: undefined
        }));
    }

    render() {
        const { tvshows, tvshowToDelete } = this.state;
        return tvshows ?
            tvshows[0] ?
                <AdminListPage
                    tvshowToDelete={tvshowToDelete}
                    prepareDelete={this.prepareDelete}
                    deleteShow={this.deleteShow}
                    cancelDelete={this.cancelDelete}
                    tvshows={tvshows} /> :
                <Loading /> :
            <Redirect to='/not-found' />;
    }
}

const AdminListPage = ({
    tvshowToDelete,
    prepareDelete,
    deleteShow,
    cancelDelete,
    tvshows }) => {
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
            prepareDelete={prepareDelete}
            deleteShow={deleteShow}
            cancelDelete={cancelDelete}
            tvshows={tvshows} />
    </div>
}

const TVList = ({
    tvshowToDelete,
    prepareDelete,
    deleteShow,
    cancelDelete,
    tvshows }) => {
    return (<table className='TVList'>
        <tbody><tr>
            {
                Object.keys(tvshows[0]).reduce((acc, k) => {
                    const key = k === 'thumbCover' ?
                        'imageCover' :
                        k === 'imageBackground' ?
                            'thumbBackground' :
                            k;
                    return acc.concat(<th key={key}>{key}</th>);
                }, [])
            }
            <th>Edit</th>
            <th>Delete</th>
        </tr></tbody>
        {
            tvshows.map((tvshow) => {
                return tvshowToDelete === tvshow.id ?
                    <tbody key={tvshow.id} id='ToDelete'>{
                        tvshowRow(prepareDelete,
                            tvshow,
                            true,
                            cancelDelete,
                            deleteShow)
                    }</tbody> :
                    <tbody key={tvshow.id}>{
                        tvshowRow(prepareDelete, tvshow)
                    }</tbody>;
            })
        }
    </table>);
}

const tvshowRow = (
    prepareDelete,
    tvshow,
    confirmDelete,
    cancelDelete,
    deleteShow) => {
    return (<tr key={tvshow.id}>
        {
            Object.entries(tvshow).map(kv => {
                let className = `Cell${
                    kv[0].charAt(0).toUpperCase() + kv[0].slice(1)}`;
                if (kv[0] === 'thumbCover' || kv[0] === 'thumbBackground') {
                    const {mimetype, data} = kv[1];
                    return <td className={className} key={kv[0]}>
                        <img src={
                            `data:${mimetype};base64,${data}`}
                            alt={`${tvshow.id} ${kv[0]}`} />
                    </td>
                }
                return <td className={className} key={kv[0]}>{kv[1]}</td>;
            })
        }
        <td>
            <img className='Edit icon'
                src={require(`../../common/images/editicon.svg`)}
                alt={'Edit icon'} />
        </td>
        {
            confirmDelete ?
                <td id='ConfirmDelete'>
                    <div
                        className='DeleteItem'
                        id='title'
                    >Please confirm:</div>
                    <button
                        className='DeleteItem'
                        id='Cancel'
                        onClick={cancelDelete}
                    >&#215; Cancel</button>
                    <button
                        className='DeleteItem'
                        id='Delete'
                        onClick={deleteShow}
                    >&#10004;  Delete</button>
                </td> :
                <td>
                    <img onClick={() => prepareDelete(tvshow.id)}
                        className='Delete icon'
                        src={require(`../../common/images/deleteicon.svg`)}
                        alt={'Delete icon'} />
                </td>
        }
    </tr>
    );
}