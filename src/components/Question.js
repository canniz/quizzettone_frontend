import React, { useState } from 'react';
import './Question.css'; // Ensure you have this import

function Question({ question, onSubmit }) {
    const handleOptionClick = (option, index) => {
        // Directly call onSubmit with the selected option
        onSubmit(option, index); // Pass both option and index if needed
    };

    return (
        <div className="question-container">
            <h2>{question.question}</h2>
            <div className="options-container">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        className={`option-button`}
                        onClick={() => onSubmit(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Question;
