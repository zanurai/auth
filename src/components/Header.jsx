import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { useLogoutMutation, useUpdateUserMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
//import { profile } from '../slices/authSlice';

const Header = () => {

    const { userInfo } = useSelector((state) => state.auth)

    //const token = userInfo && userInfo.token;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()
    //const [profileApiCall] = useUpdateUserMutation()

    console.log(userInfo);
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap() //unwrap make req actually distroy the cookie
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.log('error')
        }

    }
    const profileHandler = async () => {
        // try {
        //     await profileApiCall().unwrap()
        //     dispatch(profile())
        navigate('/profile')
        // } catch (err) {
        //     console.log('err')
        // }

    }
    return (
        <>
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container fluid>
                        <LinkContainer to="/">
                            <Navbar.Brand >MERN Auth</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="ms-auto">{userInfo ? (
                                <LinkContainer to="/profile">
                                    <>
                                        <NavDropdown title={userInfo && userInfo.name ? userInfo.name : 'zanu'} id='username'>

                                            <NavDropdown.Item onClick={profileHandler}>
                                                profile
                                            </NavDropdown.Item>
                                            <NavDropdown.Item onClick={logoutHandler}>
                                                Logout
                                            </NavDropdown.Item>

                                        </NavDropdown>
                                    </>
                                </LinkContainer>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link ><FaSignInAlt />Sign In</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/register'>
                                        <Nav.Link><FaSignOutAlt />Sign Up</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}

export default Header
