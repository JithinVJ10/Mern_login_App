import { Navbar, Nav, Container,NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout,logoutAdmin } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const {userInfo} = useSelector((state)=>state.auth)
  const {adminInfo} = useSelector((state)=>state.auth)

  const [logoutApiCall] = useLogoutMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async ()=>{
    if (userInfo) {
      try {
        await logoutApiCall().unwrap()
        dispatch(logout())
        navigate('/')
      } catch (err) {
        console.log(err);
      }
    } else if(adminInfo){
      try {
        await logoutApiCall().unwrap()
        dispatch(logoutAdmin())
        navigate('/admin')
      } catch (err) {
        console.log(err);
      }
    }

  }
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
          <Navbar.Brand href='/'>MERN App</Navbar.Brand>
        </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>

            {userInfo || adminInfo ? (
                <>
                  <NavDropdown title={userInfo?.name || adminInfo?.adminName} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={ logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;