import React from 'react';
import styles from './ChefCard.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUserThunk } from '../../sercives/user/user-thunks';
import defaultUser from '../../data/default-user';
import { Link } from 'react-router-dom';

const ChefCard = ({ user = defaultUser }) => {

    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch()

    const followChef = async () => {
        const updatedFollows = [...currentUser.chefsFollowingIds, user._id]
        const updatedUser = { ...currentUser, chefsFollowingIds: updatedFollows };
        const response = await dispatch(updateUserThunk(updatedUser));
    }

    const unfollowChef = async () => {
        const updatedFollows = currentUser.chefsFollowingIds.filter((chefId) => chefId !== user._id);
        const updatedUser = { ...currentUser, chefsFollowingIds: updatedFollows };
        const response = await dispatch(updateUserThunk(updatedUser));
    }

    return (
        <div className={styles.ChefCard}>
            <div className='card'>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-8'>
                            <Link to={`/profile/username/${user.username}`} style={{ textDecoration: 'none' }}>
                                <h5 className='card-title'>
                                    {user.firstName + ' ' + user.lastName}
                                </h5>
                                {user.username}

                            </Link>
                        </div>
                        <div className='col-4'>
                            {currentUser && currentUser.isChef === false ?
                                (currentUser.chefsFollowingIds.find((chefId) => user._id === chefId) ?
                                    <button onClick={unfollowChef} className={'btn btn-danger float-end'}> Unfollow </button> :
                                    <button onClick={followChef} className={'btn btn-primary float-end'}> Follow </button>)
                                : ''}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChefCard;