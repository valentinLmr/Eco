import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfil } from '../../backend/Actions/userActions';
import { USER_UPDATE_PROFIL_RESET } from '../../backend/constants/userConstants';
import {LoadingBox} from '../Helper/LoadingBox'
import {MessageBox} from '../Helper/MessageBox'


const Profil = (props) => {
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    // if(!userInfo) {
    //     props.history.push('/')
    // }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();
    

   
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user } = userDetails
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {loading :loadingUserUpdat , success, error: errorUserUpdate} = userUpdateProfile
    useEffect(() =>{
        if(!user){
            dispatch({type: USER_UPDATE_PROFIL_RESET})
            dispatch(detailsUser(userInfo._id))
        } else{
            setName(user.name)
            setEmail(user.email)
        }

    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert('Password and Confirm Password are not match')
        } else {
            dispatch(updateUserProfil({userId: user._id, name, email, password}))
        }
    }
     return (
         <div>
             <form className='form' onSubmit={submitHandler}>
                 <div> <h3>User Profile</h3></div>

                 {
                     loading ? <LoadingBox></LoadingBox> :
                     error ? <MessageBox variant='danger'> {error}</MessageBox> :
                    <>
                    {loadingUserUpdat && <LoadingBox></LoadingBox>}
                    {success ? <MessageBox variant='success'>Updated successfuly</MessageBox> : <MessageBox variant='danger'>{errorUserUpdate}</MessageBox>}
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input id='name'  type='text' placeholder='Enter Name' value={name} onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input id='email'  type='text' placeholder='Enter Email' value={user.email} onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input id='password'  type='text' placeholder='Enter Password' onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>Confirme Password</label>
                        <input id='confirmPassword'  type='text' placeholder=' Confirm Password' onChange={e => setConfirmPassword(e.target.value)}></input>
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