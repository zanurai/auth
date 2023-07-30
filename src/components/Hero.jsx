import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react'
import { Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
    return (
        <>
            <div>
                <Container className='d-flex justify-content-center' style={{ marginTop: "50px" }}>
                    <Card className="text-center d-flex flex-column align-item-center">

                        <Card.Body>
                            <h2>MERN Authentication</h2>
                            <p className="text-center mb-4">
                                This is a boilerplate for MERN authencation that stores a
                                <br></br>JWT in an HTTP-only cookie.
                                It is also use redux Toolkit and React Bootstrap library
                            </p>
                            <div className='d-flex align-item-center justify-content-center'>
                                <LinkContainer to='/login'>
                                    <Button variant="primary" className=' me-4' >Sign In</Button>
                                </LinkContainer>
                                <LinkContainer to='/register'>
                                    <Button variant="secondary" className='me-4'>Sign Up</Button>
                                </LinkContainer>
                            </div>
                        </Card.Body>

                    </Card>
                </Container>
            </div>
        </>
    )
}

export default Hero