import { Navbar, Container, Nav } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../assets/logo.jpg'

const Headers = () => {
  return (
    <header>
      <Navbar  bg="dark" variant="dark" expand="md"  collapseOnSelect >
        <Container>

          <LinkContainer to='/'>
          <Navbar.Brand>
        <img src={logo} width='150px' /> 
          </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

              <LinkContainer to='/cart'>
              <Nav.Link>
                <FaShoppingCart />
                Cart
              </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/user'>
              <Nav.Link>
                <FaUser />
                User
              </Nav.Link>
              </LinkContainer>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Headers;
