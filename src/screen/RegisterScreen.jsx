
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
//import axios from 'axios';
const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { userInfo } = useSelector((state) => state.auth)

    const [register, { isLoading }] = useRegisterMutation();

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            // console.log('submit')
        } else {
            try {

                const res = await register({ name, email, password }).unwrap();

                // const userDataResponse = await axios.get('/api/user')
                // console.log(userDataResponse)
                // const userData = {
                //     ...res,
                //     name: userDataResponse.data.name
                // }
                dispatch(setCredentials({ ...res }))
                navigate('/')
            } catch (err) {
                // toast.error(err?.data?.message || err.error)
                // console.log(err?.data?.message || err.error)
                if (err?.res?.data?.message === 'User already exists') {
                    toast.error('User Already exist')
                } else {
                    toast.error(err?.data?.message || err.error)
                }
            }
        }
    }
    return (
        <div>
            <div>
                <FormContainer>
                    <h1>Sign Up</h1>
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
                        <Button type='submit' variant='primary' className='mt-3'>Sign Up</Button>

                        <Row className='py-3'>
                            <Col>
                                Already Have Account<Link to="/login">Login</Link>
                            </Col>
                        </Row>
                    </Form>
                </FormContainer>
            </div>
        </div>
    )
}

export default RegisterScreen
