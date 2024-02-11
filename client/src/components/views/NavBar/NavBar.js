import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser} from '../../../redux/userRedux';
import styles from '../NavBar/NavBar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd } from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
  const user = useSelector(getUser); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setTimeout(() => {
      navigate('/logout')
    }, 500);
  
  }

  return (
    <section className="Navigation">
      <Container className={styles.customNavbar}>
        <Navbar expand="lg" className={`mt-4 mb-4 rounded`}>
          <Navbar.Brand href="#home" className='text-light'>
            <FontAwesomeIcon icon={faAd} className="mr-2" />
            ADS.Board
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="mobile-menu" />
          <Navbar.Collapse id="mobile-menu" className="justify-content-end" >
            <Nav>
              <Nav.Link as={NavLink} to="/" className='text-light' >
                Home
              </Nav.Link>
             
              {!user && (<Nav.Link as={NavLink} to="/login" className='text-light'>
                Log in
              </Nav.Link>)}
             
            
              {user && (
              <>
                <Nav.Link as={NavLink} to="/logout" className='text-light' onChange={handleLogout}>
                  Log out
                </Nav.Link>
                <Nav.Link as={NavLink} to="/ads" className='text-light'>
                  Create advert
                </Nav.Link>
              </>
              )}
                          
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </section>
  );
};

export default NavBar;