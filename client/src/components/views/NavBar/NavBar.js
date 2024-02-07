import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../../redux/userRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { logout } from '../../../redux/userRedux';

const NavBar = () => {
  const user = useSelector(getUser);

  return (
    <section className="Navigation">
      <Navbar bg="light" expand="lg" className={"mt-4 mb-4 rounded"}>
        <Container>
          <Navbar.Brand href="#home" className='text-dark'>Ads Board</Navbar.Brand>
          <Navbar.Toggle aria-controls="mobile-menu" />
          <Navbar.Collapse id="mobile-menu" className="justify-content-end" >
            <Nav>
              <Nav.Link as={NavLink} to="/" >
                <span>Home</span>
              </Nav.Link>
              {!user ? ( // If user is not logged in
                <Nav.Link as={NavLink} to="/login">
                  <span>Log in</span>
                </Nav.Link>
              ) : ( // If user is logged in
                <>
                  <Nav.Link as={NavLink} to="/ads">
                    <span>Create advert</span>
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/logout">
                    <span>Log out</span>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default NavBar;