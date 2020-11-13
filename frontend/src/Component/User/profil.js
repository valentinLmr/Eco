import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../../backend/Actions/userActions';
import {LoadingBox} from '../Helper/LoadingBox'
import {MessageBox} from '../Helper/MessageBox'


const Profil = () => {
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user } = userDetails
    useEffect(() =>{
        dispatch(detailsUser(userInfo._id))
    }, [dispatch, userInfo._id])

    const submitHandler = (e) => {
        e.preventDefault();

    }
     return (
         <div>
             <form className='form' onSubmit={submitHandler}>
                 <div> <h3>User Profile</h3></div>
                 {
                     loading ? <LoadingBox></LoadingBox> :
                     error ? <MessageBox variant='danger'> {error}</MessageBox> :
                    <>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input id='name'  type='text' placeholder='Enter Name' value={user.name}></input>
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input id='email'  type='text' placeholder='Enter Email' value={user.email}></input>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input id='password'  type='text' placeholder='Enter Password' ></input>
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>Confirme Password</label>
                        <input id='confirmPassword'  type='text' placeholder=' Confirm Password'></input>
                    </div>
                    <label/>
                    <button className='primary' type='submit'>
                        Update
                    </button>
                    </>
                 }
             </form>
         </div>
     )
}

export default Profil