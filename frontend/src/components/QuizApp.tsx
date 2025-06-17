import React, { useState } from "react";
import TopicSelection from "./TopicSelection";
import Quiz from "./Quiz";
import ScoreDisplay from "./ScoreDisplay";
import Leaderboard from "./Leaderboard";
import { Topic } from "@/model/user";
import { useTopics, useQuestions } from "@/api/queries";

type QuizState = "topic-selection" | "quiz" | "score" | "leaderboard";

export interface QuizResult {
  topicId: string;
  topicName: string;
  score: number;
  totalQuestions: number;
  duration: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

const getUserFromToken = () => {
  try {
    const authData = localStorage.getItem("auth");
    if (!authData) return null;

    const { idToken } = JSON.parse(authData);
    if (!idToken) return null;

    // Decode JWT token (split and decode base64)
    const payload = idToken.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));

    return {
      userId: decodedPayload.sub,
      username: decodedPayload["cognito:username"],
      email: decodedPayload.email,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const QuizApp: React.FC = () => {
  const [currentState, setCurrentState] =
    useState<QuizState>("topic-selection");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Use React Query to fetch topics and questions
  const { data: apiTopics = [], isLoading: topicsLoading } = useTopics();
  const { data: questions = [], isLoading: questionsLoading } = useQuestions(
    selectedTopic?.id || "",
  );

  // Append the Math Sprint topic to the fetched topics
  const topics = [...apiTopics, { id: "math", name: "Math Sprint" }];

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentState("quiz");
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setCurrentState("score");
  };

  const handleRestart = () => {
    setSelectedTopic(null);
    setQuizResult(null);
    setCurrentState("topic-selection");
  };

  const handleNewQuiz = () => {
    setQuizResult(null);
    setCurrentState("topic-selection");
  };

  // const handleViewLeaderboard = () => {
  //     setCurrentState('leaderboard');
  // };

  const handleBackToTopics = () => {
    setCurrentState("topic-selection");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Mind Sprinter
          </h1>
          <p className="text-gray-600 mb-2">
            Test your knowledge across different topics
          </p>
          <div className="text-sm text-gray-500">
            Logged in as:{" "}
            <span className="font-medium text-gray-700">
              {getUserFromToken()?.username || "Guest"}
            </span>
          </div>
        </header>

        {currentState === "topic-selection" && (
          <>
            {topicsLoading ? (
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-yellow-300">
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span className="ml-3 text-purple-600 text-lg">
                    Loading topics...
                  </span>
                </div>
              </div>
            ) : (
              <TopicSelection
                topics={topics}
                onTopicSelect={handleTopicSelect}
              />
            )}
          </>
        )}

        {currentState === "leaderboard" && (
          <Leaderboard onBack={handleBackToTopics} />
        )}

        {currentState === "quiz" && selectedTopic && (
          <>
            {selectedTopic.id === "math" ? (
              // Math Sprint uses a different component that generates its own questions
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-yellow-300">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-purple-600 mb-4">
                    🔢 Math Sprint Quiz 🔢
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Math Sprint generates questions dynamically. Please use the
                    dedicated Math Quiz page.
                  </p>
                  <button
                    onClick={() => setCurrentState("topic-selection")}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
                  >
                    Back to Topics
                  </button>
                </div>
              </div>
            ) : questionsLoading ? (
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-yellow-300">
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span className="ml-3 text-purple-600 text-lg">
                    Loading questions...
                  </span>
                </div>
              </div>
            ) : questions.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-yellow-300">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-red-600 mb-4">
                    No Questions Available
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Sorry, no questions are available for this topic at the
                    moment.
                  </p>
                  <button
                    onClick={() => setCurrentState("topic-selection")}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
                  >
                    Back to Topics
                  </button>
                </div>
              </div>
            ) : (
              <Quiz
                topic={selectedTopic}
                questions={questions}
                onQuizComplete={handleQuizComplete}
                onBack={() => setCurrentState("topic-selection")}
              />
            )}
          </>
        )}

        {currentState === "score" && quizResult && (
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
