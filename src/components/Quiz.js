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
    const [questionsAnswered, setQuestionsAnswered] = useState(0); // Track the number of answered questions
    const [totalQuestions, setTotalQuestions] = useState(0); // Total number of questions
    const [quizCompleted, setQuizCompleted] = useState(false); // New state to track quiz completion


    useEffect(() => {
        // Fetch the total number of questions on initial load
        axios.get('http://127.0.0.1:5000/total-questions')
            .then(response => {
                setTotalQuestions(response.data.total);
            })
            .catch(error => console.error('Error fetching total number of questions', error));

        if (hasEnteredUsername) {
            fetchQuestion();
        }
    }, [hasEnteredUsername]);

    const fetchQuestion = () => {
        axios.get(`http://127.0.0.1:5000/get-question?user=${username}`)
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
        axios.post('http://127.0.0.1:5000/submit-answer', {
            username,
            question_id: currentQuestion.id,
            selected_option_index: selectedOptionIndex  // Send the index
        })
        .then(response => {
            const { correct } = response.data;
            if (correct) {
                setScore(prevScore => prevScore + 10);
            }
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
                            <Timer duration={30} onTimeOut={fetchQuestion} />
                        </>
                    )}
                    <Scoreboard score={score} />
                </>
            )}
        </div>
    );
}

export default Quiz;
