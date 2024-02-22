import React from 'react';
import './Question.css';

function Question({ question, onSubmit }) {
    return (
        <div className="question-container">
            <h2>{question.question}</h2>
            <div className="options-container">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        className="option-button"
                        onClick={() => onSubmit(index)}> {/* Pass only the index */}
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Question;
