import { React, useState } from 'react';
import { Nav, Navbar, Container, } from 'react-bootstrap';
import '../css/app.css'


function NavbarMain() {
    return (
        <Navbar bg="dark" variant="dark" className="change-font">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    BeatBlocks
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavbarMain;