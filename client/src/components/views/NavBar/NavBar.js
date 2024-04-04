import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser, logout} from '../../../redux/userRedux';
import styles from '../NavBar/NavBar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../../config';
import { useState } from 'react';


const NavBar = () => {
  const user = useSelector(getUser);
  const dispatch =  useDispatch();
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'
  
  const handleSubmit = () => {
    const options = {
      method: "DELETE",
    }

    setStatus("loading");
    fetch(`${API_URL}/auth/logout`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus("success");
          dispatch(logout());
        } else {
          setStatus("serverError");
        }
      })
      .catch((err) => {
        setStatus("serverError");
      });
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
             
              {user && user.currentUser !== null && status !== "success" && (
                <>
                  <Nav.Link as={NavLink} to="/logout" className="text-light" onClick={handleSubmit}>
                    Log out
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/ads" className="text-light">
                    Create advert
                  </Nav.Link>
                </>
              )}

              {(user === null || user.currentUser === null) && (
                <Nav.Link as={NavLink} to="/login" className="text-light">
                  Log in
                </Nav.Link>
              )}
                          
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </section>
  );
};

export default NavBar;