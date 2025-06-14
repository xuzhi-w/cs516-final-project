import React from 'react';
import { Button } from '@/components/ui/button';
import { Topic } from '@/model/user';
import { BookOpenIcon, GlobeIcon, BeakerIcon, ScrollIcon } from 'lucide-react';

interface TopicSelectionProps {
    topics: Topic[];
    onTopicSelect: (topic: Topic) => void;
}

const getTopicIcon = (topicId: string) => {
    switch (topicId) {
        case 'english_vocabulary':
            return <BookOpenIcon className="w-8 h-8" />;
        case 'geography':
            return <GlobeIcon className="w-8 h-8" />;
        case 'science':
            return <BeakerIcon className="w-8 h-8" />;
        case 'world_history':
            return <ScrollIcon className="w-8 h-8" />;
        default:
            return <BookOpenIcon className="w-8 h-8" />;
    }
};

const getTopicColor = (topicId: string) => {
    switch (topicId) {
        case 'english_vocabulary':
            return 'from-green-400 to-green-600';
        case 'geography':
            return 'from-blue-400 to-blue-600';
        case 'science':
            return 'from-purple-400 to-purple-600';
        case 'world_history':
            return 'from-orange-400 to-orange-600';
        default:
            return 'from-gray-400 to-gray-600';
    }
};

const TopicSelection: React.FC<TopicSelectionProps> = ({ topics, onTopicSelect }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
                    Choose Your Quiz Topic
                </h2>
                <p className="text-center text-gray-600">
                    Select a topic to start your quiz. Each quiz contains 10 questions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topics.map((topic) => (
                    <div
                        key={topic.id}
                        className="group cursor-pointer"
                        onClick={() => onTopicSelect(topic)}
                    >
                        <div className={`bg-gradient-to-r ${getTopicColor(topic.id)} rounded-lg p-6 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-lg`}>
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-white/20 rounded-full p-3">
                                    {getTopicIcon(topic.id)}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-center mb-2">{topic.name}</h3>
                            <p className="text-center text-white/90 text-sm">
                                Test your knowledge in {topic.name.toLowerCase()}
                            </p>
                            <div className="mt-4 flex justify-center">
                                <Button
                                    variant="secondary"
                                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                                >
                                    Start Quiz
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicSelection;
