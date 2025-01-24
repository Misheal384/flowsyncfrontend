import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Question {
    id: number;
    questionText: string;
}

const AnswerStandup: React.FC = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`/api/teams/${teamId}/questions`);
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [teamId]);

    const handleInputChange = (questionId: number, value: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/teams/${teamId}/answers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });
            if (response.ok) {
                alert('Answers submitted successfully!');
            } else {
                alert('Failed to submit answers.');
            }
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };

    return (
        <div>
            <h1>Answer Standup Questions</h1>
            <form onSubmit={handleSubmit}>
                {questions.map((question) => (
                    <div key={question.id}>
                        <label>
                            {question.questionText}
                            <input
                                type="text"
                                value={answers[question.id] || ''}
                                onChange={(e) => handleInputChange(question.id, e.target.value)}
                            />
                        </label>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AnswerStandup;