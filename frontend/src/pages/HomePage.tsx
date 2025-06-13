import React from 'react';
import { useNavigate } from 'react-router';
import TopicSelection from '../components/TopicSelection';
import { Topic } from '../model/user';
import { topics } from '../data';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleTopicSelect = (topic: Topic) => {
        navigate(`/quiz/${topic.id}`);
    };

    return (
        <TopicSelection
            topics={topics}
            onTopicSelect={handleTopicSelect}
        />
    );
};

export default HomePage;
