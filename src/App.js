import React from "react";
import Quiz from "./components/Quiz";
import Leaderboard from "./components/Leaderboard";
import QuizNavbar from "./components/QuizNavbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <QuizNavbar />
        <Routes>
          {/* Wrap Route components in Routes */}
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
