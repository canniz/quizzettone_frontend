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
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink 
              to="/quiz" 
              onClick={(e) => handleReload(e, '/quiz')}
              className="me-3" // Bootstrap spacing class
            >
              Quizzettone
            </NavLink>
            <NavLink 
              to="/leaderboard" 
              onClick={(e) => handleReload(e, '/leaderboard')}
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
