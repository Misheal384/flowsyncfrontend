import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../Navbar';
import "../styles/ConfigureStandupQuestions.css";

interface Question {
  id: number;
  text: string;
  format: string;
}

const ConfigureStandupQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: '', format: 'text' },
  ]);
  
  const navigate = useNavigate(); // Initialize navigate

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, text: '', format: 'text' },
    ]);
  };

  const handleQuestionChange = (id: number, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const handleFormatChange = (id: number, format: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, format } : q)));
  };

  const handleSaveQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    // Assuming save operation is successful:
    console.log('Questions saved successfully:', questions);

    // Redirect to the add team member page after saving questions
    navigate('/add-team-member');
  };

  return (
    <div className="configure-questions">
      <Navbar />
      <h1>Configure Standup Questions</h1>
      <form className="questions-form" onSubmit={handleSaveQuestions}>
        {questions.map((question) => (
          <div key={question.id} className="question-group">
            <label htmlFor={`question-${question.id}`} className="form-label">
              Question {question.id}:
            </label>
            <input
              id={`question-${question.id}`}
              type="text"
              placeholder="Enter your question"
              value={question.text}
              onChange={(e) => handleQuestionChange(question.id, e.target.value)}
              className="form-input"
            />
            <label
              htmlFor={`format-${question.id}`}
              className="form-label format-label"
            >
              Answer Format:
            </label>
            <select
              id={`format-${question.id}`}
              value={question.format}
              onChange={(e) => handleFormatChange(question.id, e.target.value)}
              className="form-select"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="boolean">Yes/No</option>
            </select>
          </div>
        ))}
        <div className="form-buttons">
          <button type="button" onClick={addQuestion} className="form-button">
            Add Question
          </button>
          <button type="submit" className="form-button">
            Save Questions
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfigureStandupQuestions;
