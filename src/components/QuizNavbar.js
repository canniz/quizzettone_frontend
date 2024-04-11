import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useLocation } from 'react-router-dom';

function QuizNavbar() {
  const location = useLocation();

  const handleReload = (event, path) => {
    if (location.pathname === path) {
      event.preventDefault();
      window.location.reload();
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/Quiz">Quizzettone</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink 
              to="/Leaderboard" 
              onClick={(e) => handleReload(e, '/Leaderboard')}
            >
              Leaderboard
            </NavLink>
            {/* Add more NavLinks if needed */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default QuizNavbar;
