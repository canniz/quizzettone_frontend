import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css'; // Ensure this is still imported

function Leaderboard() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        // Get the current date
        const now = new Date();
        // Format the date as "game_YYYY_MM_DD"
        const gameParam = `game_${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;
        axios.get(`http://127.0.0.1:5000/scores?game=${gameParam}`)
            .then(response => {
                // Convert object to array and sort
                const sortedScores = Object.entries(response.data)
                    .sort((a, b) => b[1].score - a[1].score);
                setScores(sortedScores);
            })
            .catch(error => console.error('Error fetching scores', error));
    }, []);

    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            <ul className="leaderboard-list">
                {scores.map(([username, userScores], index) => (
                    <li key={index} className="leaderboard-item">
                        {username}: {userScores.score} points
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;
