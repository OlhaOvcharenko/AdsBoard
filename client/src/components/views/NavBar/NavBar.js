import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
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
            <Nav.Link as={NavLink} to="auth/login">
            <span>Sign in</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="auth/logout">
            <span>Sign out</span>
            </Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </section>
);
  
  export default NavBar;