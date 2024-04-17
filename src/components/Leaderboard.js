import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leaderboard.css";
import { RefreshIcon } from "../icons/RefreshIcon";

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const API_HOST = process.env.REACT_APP_API_HOST;

  // Function to fetch scores
  const fetchScores = () => {
    const now = new Date();
    const gameParam = `game_${now.getFullYear()}_${String(
      now.getMonth() + 1
    ).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
    axios
      .get(`${API_HOST}/scores?game=${gameParam}`)
      .then((response) => {
        const sortedScores = Object.entries(response.data).sort(
          (a, b) => b[1].score - a[1].score
        );
        setScores(sortedScores);
      })
      .catch((error) => console.error("Error fetching scores", error));
  };

  // UseEffect to run on mount
  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <main className="page">
      <h2>Leaderboard</h2>
      <button onClick={fetchScores} className="refresh_btn">
        <RefreshIcon />
      </button>
      <ul className="leaderboard-list">
        {scores.map(([username, userScores], index) => (
          <li key={index} className="leaderboard-item">
            {username}: {userScores.score} points
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Leaderboard;
