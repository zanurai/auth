import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { getToken } from '../utils/tokenUtils';
const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { userInfo } = useSelector((state) => state.auth)
    console.log(userInfo);
    const [updateProfile, { isLoading }] = useUpdateUserMutation()

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name || '');
            setEmail(userInfo.email || '');
        }

    }, [userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            // console.log('submit')
        } else {
            try {
                const token = getToken();
                if (!token) {
                    toast.error('Not authorized');
                    return;
                }
                const data = {
                    name,
                    email,
                    password,
                };
                axios.defaults.withCredentials = true;
                const res = await axios.put('http://localhost:5000/api/users/profile', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    //withCredentials: true,
                })
                // const res = await updateProfile({
                //     _id: userInfo._id,
                //     name,
                //     email,
                //     password
                // }).unwrap()
                dispatch(setCredentials({ ...res.data.user }))
                navigate('/')
                //console.log('profile updated successfully:', data)
                toast.success('Profile updated')
            } catch (err) {
                console.log(err)
                toast.error(err?.res?.data?.message || err.error)
                console.log('Failed to update profile:', err)
                //console.err('Failed to update profile:', err)
            }

        }
    }

    return (
        <div>
            <div>
                <FormContainer>
                    <h1>Update Profile</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='Confirmpassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        {isLoading && <Loader />}

                        <Button type='submit' variant='primary' className='mt-3'>Update</Button>


                    </Form>
                </FormContainer>
            </div>
        </div>
    )
}

export default ProfileScreen
