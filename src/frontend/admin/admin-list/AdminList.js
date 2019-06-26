import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../../Loading';

import './AdminList.css';

export default class AdminList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvshows: []
        };
    }

    componentDidMount() {
        fetch(`/rest/tvshows`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(tvshows => {
            this.setState({ tvshows });
        });
    }

    render() {
        const { tvshows } = this.state;
        debugger;
        return tvshows ?
            tvshows[0] ?
                <AdminListPage tvshows={tvshows} /> :
                <Loading /> :
            <Redirect to='/not-found' />;
    }
}

const AdminListPage = ({ tvshows }) => {
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
                    alt={'Edit icon'} />
            </Link>
        </div>
        <TVList tvshows={tvshows} />
    </div>
}

const TVList = ({ tvshows }) => {
    return (<table className='TVList'><tbody>
        <tr>
            {
                Object.keys(tvshows[0]).map((k, i) => {
                    return <th key={i}>{k}</th>;
                })
            }
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        {
            tvshows.map((tvshow, i) => {
                return (<tr key={i}>
                    {
                        Object.values(tvshow).map((v, i) => {
                            return <td key={i}>{v}</td>;
                        })
                    }
                    <td>
                        <img className='Edit icon'
                            src={require(`../../common/images/editicon.svg`)}
                            alt={'Edit icon'} />
                    </td>
                    <td>
                        <img className='Delete icon'
                            src={require(`../../common/images/deleteicon.svg`)}
                            alt={'Delete icon'} />
                    </td>
                </tr>);
            })
        }
    </tbody></table>);
}