import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { submitStandup } from '../services/api';
import "./StandupPage.css";

const StandupPage: React.FC = () => {
  const { teamId, memberId } = useParams<{ teamId: string; memberId: string }>();
  const [answers, setAnswers] = useState([
    { question: 'What did you work on today?', answer: '' },
    { question: 'Any blockers?', answer: '' },
  ]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const handleSubmitStandup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await submitStandup(teamId!, memberId!, answers);
      console.log('Standup submitted:', response.data);
    } catch (error) {
      console.error('Error submitting standup:', error);
    }
  };

  return (
    <div>
      <h1>Submit Standup</h1>
      <form onSubmit={handleSubmitStandup}>
        {answers.map((answer, index) => (
          <div key={index}>
            <label>{answer.question}</label>
            <input
              type="text"
              value={answer.answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Submit Standup</button>
      </form>
    </div>
  );
};

export default StandupPage;
