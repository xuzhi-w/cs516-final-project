import React from 'react';
import { useNavigate } from 'react-router';
import TopicSelection from '../components/TopicSelection';
import { Button } from '../components/ui/button';
import { Trophy } from 'lucide-react';
import { Topic } from '../model/user';
import { topics } from '../data';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleTopicSelect = (topic: Topic) => {
        navigate(`/quiz/${topic.id}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-center mb-6">
                <Button
                    onClick={() => navigate('/leaderboard')}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    <Trophy className="w-4 h-4" />
                    View Leaderboard
                </Button>
            </div>

            <TopicSelection
                topics={topics}
                onTopicSelect={handleTopicSelect}
            />
        </div>
    );
};

export default HomePage;
