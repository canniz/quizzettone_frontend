import React, { useState, useEffect } from 'react';
import Question from './Question';
import Timer from './Timer';
import Scoreboard from './Scoreboard';
import Leaderboard from './Leaderboard'; // Import the Leaderboard component
import axios from 'axios';

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [username, setUsername] = useState("");
    const [hasEnteredUsername, setHasEnteredUsername] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(0); // Total number of questions
    const [quizCompleted, setQuizCompleted] = useState(false); // New state to track quiz completion
    const API_HOST = process.env.REACT_APP_API_HOST;

    useEffect(() => {
        // Fetch the total number of questions on initial load
        console.log(API_HOST)
        axios.get(`${API_HOST}/total-questions`)
            .then(response => {
                setTotalQuestions(response.data.total);
            })
            .catch(error => console.error('Error fetching total number of questions', error));

        if (hasEnteredUsername) {
            fetchQuestion();
        }
    }, [hasEnteredUsername]);

    const handleTimeOut = () => {
        setQuizCompleted(true);  // Set quiz completion to true when time is up
    };

    const fetchQuestion = () => {
        axios.get(`${API_HOST}/get-question?user=${username}`)
            .then(response => {
                if (response.data.message === "No more questions") {
                    setQuizCompleted(true); // Set quiz completion to true
                } else {
                    setCurrentQuestion(response.data);
                }
            })
            .catch(error => console.error('Error fetching question', error));
    };

    const handleSubmitAnswer = (selectedOptionIndex) => {
        axios.post(`${API_HOST}/submit-answer`, {
            username,
            question_id: currentQuestion.id,
            selected_option_index: selectedOptionIndex  // Send the index
        })
        .then(response => {
            const { correct } = response.data;
            setScore(prevScore => {
                // Add 10 for a correct answer, subtract 2.5 for an incorrect one
                return correct ? prevScore + 10 : prevScore - 2.5;
            });
            fetchQuestion(); // Fetch the next question
        })
        .catch(error => console.error('Error submitting answer', error));
    };

    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        if (username) {
            setHasEnteredUsername(true);
        }
    };

    if (!hasEnteredUsername) {
        return (
            <div>
                <h2>Enter your username to start the quiz</h2>
                <form onSubmit={handleUsernameSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="submit">Start Quiz</button>
                </form>
            </div>
        );
    }

    if (quizCompleted) {
        return <Leaderboard />; // Render the Leaderboard when the quiz is completed
    }

    return (
        <div>
            {hasEnteredUsername && (
                <>
                    <div>
                        <h3>Welcome, {username}</h3>
                    </div>
                    {currentQuestion && (
                        <>
                            <Question question={currentQuestion} onSubmit={handleSubmitAnswer} />
                            <Timer duration={60} onTimeOut={handleTimeOut} />
                        </>
                    )}
                    <Scoreboard score={score} />
                </>
            )}
        </div>
    );
}

export default Quiz;
