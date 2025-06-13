import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Topic, Questions } from '@/model/user';
import { QuizResult } from './QuizApp';
import { ArrowLeftIcon, ClockIcon } from 'lucide-react';

interface QuizProps {
    topic: Topic;
    questions: Questions[];
    onQuizComplete: (result: QuizResult) => void;
    onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ topic, questions, onQuizComplete, onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [startTime] = useState(Date.now());
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed(Date.now() - startTime);
        }, 1000);

        return () => clearInterval(timer);
    }, [startTime]);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleAnswerSelect = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = selectedAnswer;
        setUserAnswers(newAnswers);

        if (isLastQuestion) {
            // Calculate results
            const correctAnswers = newAnswers.reduce((count, answer, index) => {
                return answer === questions[index].correctAnswer ? count + 1 : count;
            }, 0);

            const score = Math.round((correctAnswers / questions.length) * 100);
            const duration = Date.now() - startTime;

            const result: QuizResult = {
                topicId: topic.id,
                topicName: topic.name,
                score,
                totalQuestions: questions.length,
                duration,
                correctAnswers,
                incorrectAnswers: questions.length - correctAnswers,
            };

            onQuizComplete(result);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
        }
    };

    const formatTime = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="flex items-center gap-2"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Topics
                </Button>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <ClockIcon className="w-4 h-4" />
                        <span>{formatTime(timeElapsed)}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            {/* Topic and Question */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-600 mb-2">{topic.name}</h2>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    {currentQuestion.question}
                </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
                {currentQuestion.answer.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(answer)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${selectedAnswer === answer
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === answer
                                        ? 'border-blue-500 bg-blue-500'
                                        : 'border-gray-300'
                                    }`}
                            >
                                {selectedAnswer === answer && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </div>
                            <span className="font-medium">{answer}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
                <Button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className="px-8"
                >
                    {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                </Button>
            </div>
        </div>
    );
};

export default Quiz;
