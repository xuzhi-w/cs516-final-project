import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Trophy, Medal, Award, Clock, ArrowLeft, Filter } from 'lucide-react';
import { leaderboard, users, topics } from '../data';
import { Leaderboard, User, Topic } from '../model/user';

const LeaderboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedTopicId, setSelectedTopicId] = useState<string>('all');

    const getUserName = (userId: string): string => {
        const user = users.find((u: User) => u.id === userId);
        return user ? user.name : 'Unknown User';
    };

    const getTopicName = (topicId: string): string => {
        const topic = topics.find((t: Topic) => t.id === topicId);
        return topic ? topic.name : 'Unknown Topic';
    };

    const formatDuration = (duration: number): string => {
        const minutes = Math.floor(duration / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-6 h-6 text-yellow-500" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Award className="w-6 h-6 text-amber-600" />;
            default:
                return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>;
        }
    };

    const getFilteredLeaderboard = (): Leaderboard[] => {
        let filtered = [...leaderboard];

        if (selectedTopicId !== 'all') {
            filtered = filtered.filter(entry => entry.topicId === selectedTopicId);
        }

        // Sort by score descending, then by duration ascending (faster is better)
        return filtered.sort((a, b) => {
            if (a.score !== b.score) {
                return b.score - a.score;
            }
            return a.duration - b.duration;
        });
    };

    const filteredLeaderboard = getFilteredLeaderboard();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
                </div>
            </div>

            {/* Topic Filter */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filter by Topic
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={selectedTopicId === 'all' ? 'default' : 'outline'}
                            onClick={() => setSelectedTopicId('all')}
                            size="sm"
                        >
                            All Topics
                        </Button>
                        {topics.map((topic) => (
                            <Button
                                key={topic.id}
                                variant={selectedTopicId === topic.id ? 'default' : 'outline'}
                                onClick={() => setSelectedTopicId(topic.id)}
                                size="sm"
                            >
                                {topic.name}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {selectedTopicId === 'all'
                            ? 'Overall Rankings'
                            : `${getTopicName(selectedTopicId)} Rankings`
                        }
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {filteredLeaderboard.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No scores available for this topic yet.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredLeaderboard.map((entry, index) => {
                                const rank = index + 1;
                                const isTopThree = rank <= 3;

                                return (
                                    <div
                                        key={entry.id}
                                        className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${isTopThree
                                                ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200'
                                                : 'bg-gray-50 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0">
                                                {getRankIcon(rank)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">
                                                    {getUserName(entry.userId)}
                                                </div>
                                                {selectedTopicId === 'all' && (
                                                    <div className="text-sm text-gray-600">
                                                        {getTopicName(entry.topicId)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 text-right">
                                            <div>
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {entry.score}%
                                                </div>
                                                <div className="text-xs text-gray-500">Score</div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <div className="font-medium text-gray-700">
                                                        {formatDuration(entry.duration)}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Time</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="flex justify-center">
                <Button
                    onClick={() => navigate('/')}
                    size="lg"
                    className="px-8"
                >
                    Take a Quiz
                </Button>
            </div>
        </div>
    );
};

export default LeaderboardPage;
