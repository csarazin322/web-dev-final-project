import React from 'react';
import styles from './ChefCard.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUserThunk } from '../../sercives/user/user-thunks';
import defaultUser from '../../data/default-user';

const ChefCard = (user = defaultUser) => {

    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch()

    const followChef = async () => {
        const updatedFollows = [...currentUser.likedRecipesIds, user._id]
        const updatedUser = { ...currentUser, likedRecipesIds: updatedLikes };
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
                <h5 className='card-title'>
                    {user.firstName + user.lastName}
                </h5>
                <p>
                    {user.username}
                </p>
                {currentUser ?
                    (currentUser.chefsFollowingIds.find((chefId) => chef._id === chefId) ?
                    <Button onClick={unfollowChef} className={'btn btn-secondary'}> Unfollow </Button> :
                    <Button onClick={followChef} className={'btn btn-primary'}> Follow </Button>)
                : ''}
            </div>
        </div>
    </div>
    );}