import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { getToken, storeToken } from '../utils/tokenUtils';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    useEffect(() => {
        const token = getToken()
        console.log(`hello token ${token}`)
    }, [])
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            console.log(res)
            //store the token in localStorage
            //const { name, ...rest } = res;

            //const userData = { ...rest, name };
            const token = res.token
            console.log(token)
            //console.log(name)
            storeToken(token)
            dispatch(setCredentials({ ...res }));
            navigate('/')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
            console.log(err?.data?.message || err.error)
        }
        //console.log('submit')
    }
    return (
        <div>
            <FormContainer>
                <h1>SignUp</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    {isLoading && <Loader />}
                    <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>

                    <Row className='py-3'>
                        <Col>
                            Already Have Account<Link to="/register">Register</Link>
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
        </div>
    )
}

export default LoginScreen