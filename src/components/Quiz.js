import React, { useState, useEffect } from "react";
import Question from "./Question";
import Timer from "./Timer";
import Scoreboard from "./Scoreboard";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Quiz() {
  const location = useLocation();
  const username = location.state;
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const API_HOST = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    // Check if user came from main page by submitting the form
    // if not redirect to homepage
    if (!username) {
      navigate("/");
      return;
    }

    const controller = new AbortController();
    // fetch questions
    fetchQuestion(controller.signal);
    return () => {
      // abort request on unmount
      controller.abort();
    };
  }, [username]);
  const handleTimeOut = () => {
    navigate("/leaderboard"); // Redirect user to "/leaderboard" when time is up
  };

  const fetchQuestion = (abortSignal) => {
    axios
      .get(`${API_HOST}/get-question?user=${username}`, {
        signal: abortSignal,
      })
      .then((response) => {
        if (response.data.message === "No more questions") {
          navigate("/leaderboard"); // Redirect user to "/leaderboard"
        } else {
          setCurrentQuestion(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching question", error);
      });
  };

  const handleSubmitAnswer = (selectedOptionIndex) => {
    axios
      .post(`${API_HOST}/submit-answer`, {
        username,
        question_id: currentQuestion.id,
        selected_option_index: selectedOptionIndex, // Send the index
      })
      .then((response) => {
        const { correct } = response.data;
        setScore((prevScore) => {
          // Add 10 for a correct answer, subtract 2.5 for an incorrect one
          return correct ? prevScore + 10 : prevScore - 2.5;
        });
        fetchQuestion(); // Fetch the next question
      })
      .catch((error) => console.error("Error submitting answer", error));
  };

  // location and/or username can be undefined/null if navigated directly or if navigation was triggered from nav link
  // prevent render component when waiting for navigation to mainpage
  if (!location) return null;
  if (!username) return null;

  return (
    <main className="page">
      <h2>Er Quizzettone</h2>
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
    </main>
  );
}

export default Quiz;
