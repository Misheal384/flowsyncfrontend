import React, { useState } from 'react';

interface Question {
    id: number;
    text: string;
    format: string;
}

const ConfigureStandupQuestions: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([
        { id: 1, text: '', format: 'text' }
    ]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { id: questions.length + 1, text: '', format: 'text' }
        ]);
    };

    const handleQuestionChange = (id: number, text: string) => {
        setQuestions(
            questions.map((q) => (q.id === id ? { ...q, text } : q))
        );
    };

    const handleFormatChange = (id: number, format: string) => {
        setQuestions(
            questions.map((q) => (q.id === id ? { ...q, format } : q))
        );
    };

    return (
        <div>
            <h1>Configure Standup Questions</h1>
            {questions.map((question) => (
                <div key={question.id} style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Enter your question"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                        style={{ marginRight: '10px' }}
                    />
                    <select
                        value={question.format}
                        onChange={(e) => handleFormatChange(question.id, e.target.value)}
                    >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="boolean">Yes/No</option>
                    </select>
                </div>
            ))}
            <button onClick={addQuestion}>Add Question</button>
            <button>Save Questions</button>
        </div>
    );
};

export default ConfigureStandupQuestions;