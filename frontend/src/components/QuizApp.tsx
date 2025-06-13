import React, { useState } from 'react';
import TopicSelection from './TopicSelection';
import Quiz from './Quiz';
import ScoreDisplay from './ScoreDisplay';
import { Topic, Questions } from '@/model/user';
import { topics, allQuestions } from '@/data';

type QuizState = 'topic-selection' | 'quiz' | 'score';

export interface QuizResult {
    topicId: string;
    topicName: string;
    score: number;
    totalQuestions: number;
    duration: number;
    correctAnswers: number;
    incorrectAnswers: number;
}

const QuizApp: React.FC = () => {
    const [currentState, setCurrentState] = useState<QuizState>('topic-selection');
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

    const handleTopicSelect = (topic: Topic) => {
        setSelectedTopic(topic);
        setCurrentState('quiz');
    };

    const handleQuizComplete = (result: QuizResult) => {
        setQuizResult(result);
        setCurrentState('score');
    };

    const handleRestart = () => {
        setSelectedTopic(null);
        setQuizResult(null);
        setCurrentState('topic-selection');
    };

    const handleNewQuiz = () => {
        setQuizResult(null);
        setCurrentState('topic-selection');
    };

    const getQuestionsForTopic = (topicId: string): Questions[] => {
        return allQuestions.filter(q => q.topicId === topicId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Mind Sprinter</h1>
                    <p className="text-gray-600">Test your knowledge across different topics</p>
                </header>

                {currentState === 'topic-selection' && (
                    <TopicSelection
                        topics={topics}
                        onTopicSelect={handleTopicSelect}
                    />
                )}

                {currentState === 'quiz' && selectedTopic && (
                    <Quiz
                        topic={selectedTopic}
                        questions={getQuestionsForTopic(selectedTopic.id)}
                        onQuizComplete={handleQuizComplete}
                        onBack={() => setCurrentState('topic-selection')}
                    />
                )}

                {currentState === 'score' && quizResult && (
                    <ScoreDisplay
                        result={quizResult}
                        onRestart={handleRestart}
                        onNewQuiz={handleNewQuiz}
                    />
                )}
            </div>
        </div>
    );
};

export default QuizApp;
