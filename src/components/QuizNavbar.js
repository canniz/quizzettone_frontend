import "./nav.css";
import { NavLink } from "react-router-dom";

function QuizNavbar() {
  return (
    <nav className="navbar">
      <NavLink to="/quiz">Quizzettone</NavLink>
      <NavLink to="/leaderboard">Leaderboard</NavLink>
    </nav>
  );
}

export default QuizNavbar;
