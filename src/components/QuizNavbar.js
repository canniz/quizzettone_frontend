import "./nav.css";
import { NavLink, useLocation } from "react-router-dom";

function QuizNavbar() {
  const location = useLocation();

  const handleReload = (event, path) => {
    if (location.pathname === path) {
      event.preventDefault();
      window.location.reload();
    }
  };

  return (
    <nav className="navbar">
      <NavLink
        to="/quiz"
        onClick={(e) => handleReload(e, "/quiz")}
        className="me-3" // Bootstrap spacing class
      >
        Quizzettone
      </NavLink>
      <NavLink
        to="/leaderboard"
        onClick={(e) => handleReload(e, "/leaderboard")}
      >
        Leaderboard
      </NavLink>
    </nav>
  );
}

export default QuizNavbar;
