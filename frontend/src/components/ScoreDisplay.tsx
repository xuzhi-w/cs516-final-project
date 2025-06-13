import React from 'react';
import { Button } from '@/components/ui/button';
import { QuizResult } from './QuizApp';
import { TrophyIcon, ClockIcon, CheckCircleIcon, XCircleIcon, RotateCcwIcon, PlusIcon } from 'lucide-react';

interface ScoreDisplayProps {
    result: QuizResult;
    onRestart: () => void;
    onNewQuiz: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ result, onRestart, onNewQuiz }) => {
    const formatTime = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreMessage = (score: number) => {
        if (score >= 90) return 'Excellent! Outstanding performance!';
        if (score >= 80) return 'Great job! Very good knowledge!';
        if (score >= 70) return 'Good work! Keep it up!';
        if (score >= 60) return 'Not bad! Room for improvement.';
        return 'Keep studying and try again!';
    };

    const getScoreEmoji = (score: number) => {
        if (score >= 90) return '🎉';
        if (score >= 80) return '👏';
        if (score >= 70) return '👍';
        if (score >= 60) return '🙂';
        return '📚';
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            {/* Trophy Icon */}
            <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full ${result.score >= 70 ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                    <TrophyIcon className={`w-12 h-12 ${result.score >= 70 ? 'text-yellow-600' : 'text-gray-600'}`} />
                </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600 mb-8">{result.topicName}</p>

            {/* Score */}
            <div className="mb-8">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                    {result.score}%
                </div>
                <p className="text-xl text-gray-700 mb-4">
                    {getScoreMessage(result.score)} {getScoreEmoji(result.score)}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">{result.correctAnswers}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                        <XCircleIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-red-600">{result.incorrectAnswers}</div>
                    <div className="text-sm text-gray-600">Incorrect</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                        <TrophyIcon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-700">{result.totalQuestions}</div>
                    <div className="text-sm text-gray-600">Total</div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                        <ClockIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">{formatTime(result.duration)}</div>
                    <div className="text-sm text-gray-600">Time</div>
                </div>
            </div>

            {/* Performance Breakdown */}
            <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div className="h-full flex">
                        <div
                            className="bg-green-500 transition-all duration-1000"
                            style={{ width: `${(result.correctAnswers / result.totalQuestions) * 100}%` }}
                        />
                        <div
                            className="bg-red-500 transition-all duration-1000"
                            style={{ width: `${(result.incorrectAnswers / result.totalQuestions) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{result.correctAnswers} correct</span>
                    <span>{result.incorrectAnswers} incorrect</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    onClick={onRestart}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    <RotateCcwIcon className="w-4 h-4" />
                    Retry {result.topicName}
                </Button>
                <Button
                    onClick={onNewQuiz}
                    className="flex items-center gap-2"
                >
                    <PlusIcon className="w-4 h-4" />
                    Try Different Topic
                </Button>
            </div>
        </div>
    );
};

export default ScoreDisplay;
