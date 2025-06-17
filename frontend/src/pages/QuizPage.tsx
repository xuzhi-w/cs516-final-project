import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import Quiz from "../components/Quiz";
import ScoreDisplay from "../components/ScoreDisplay";
import { QuizResult } from "../components/QuizApp";
import { useQuestions, useTopics } from "@/api/queries";

type QuizPageState = "quiz" | "score";

const QuizPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<QuizPageState>("quiz");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const { data: questions = [], isLoading } = useQuestions(topicId || "");
  const { data: topics = [] } = useTopics(); // Fetch all topics to find the selected one

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setCurrentState("score");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleRestart = () => {
    setQuizResult(null);
    setCurrentState("quiz");
  };

  const handleNewQuiz = () => {
    navigate("/");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {currentState === "quiz" && (
        <Quiz
          topic={
            topics.find((t) => t.id === topicId) || {
              id: "",
              name: "Unknown Topic",
            }
          }
          questions={questions}
          onQuizComplete={handleQuizComplete}
          onBack={handleBack}
        />
      )}

      {currentState === "score" && quizResult && (
        <ScoreDisplay
          result={quizResult}
          onRestart={handleRestart}
          onNewQuiz={handleNewQuiz}
        />
      )}
    </>
  );
};

export default QuizPage;
