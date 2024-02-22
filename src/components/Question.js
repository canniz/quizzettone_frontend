import React, { useState } from 'react';
import './Question.css'; // Ensure you have this import

function Question({ question, onSubmit }) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (selectedOption) {
            onSubmit(selectedOption);
        }
    };

    return (
        <div className="question-container">
            <h2>{question.question}</h2>
            <div className="options-container">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        className={`option-button ${selectedOption === option ? "selected" : ""}`}
                        onClick={() => handleOptionClick(option)}>
                        {option}
                    </button>
                ))}
            </div>
            <button className="submit-button" onClick={handleSubmit}>Confirm</button>
        </div>
    );
}

export default Question;
