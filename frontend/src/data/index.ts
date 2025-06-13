import englishVocabularyQuestions from "./english_vocabulary_questions.json";
import geographyQuestions from "./geography_questions.json";
import scienceQuestions from "./science_questions.json";
import worldHistoryQuestions from "./world_history_questions.json";
import { Questions, User, Topic, Leaderboard } from "../model/user";

// Combine all questions
export const allQuestions: Questions[] = [
	...englishVocabularyQuestions,
	...geographyQuestions,
	...scienceQuestions,
	...worldHistoryQuestions,
];

// Dummy Topics
export const topics: Topic[] = [
	{ id: "english_vocabulary", name: "English Vocabulary" },
	{ id: "geography", name: "Geography" },
	{ id: "science", name: "Science" },
	{ id: "world_history", name: "World History" },
];

// Dummy Users
export const users: User[] = [
	{
		id: "user_001",
		email: "alice.wonder@example.com",
		name: "Alice Wonderland",
	},
	{ id: "user_002", email: "bob.builder@example.com", name: "Bob Builder" },
	{
		id: "user_003",
		email: "charlie.brown@example.com",
		name: "Charlie Brown",
	},
	{ id: "user_004", email: "diana.prince@example.com", name: "Diana Prince" },
];

// Dummy Leaderboard
export const leaderboard: Leaderboard[] = [
	{
		id: "lb_001",
		userId: "user_001",
		topicId: "science",
		score: 95,
		duration: 180000,
	}, // 3 minutes
	{
		id: "lb_002",
		userId: "user_002",
		topicId: "geography",
		score: 88,
		duration: 210000,
	}, // 3.5 minutes
	{
		id: "lb_003",
		userId: "user_001",
		topicId: "world_history",
		score: 92,
		duration: 195000,
	}, // 3.25 minutes
	{
		id: "lb_004",
		userId: "user_003",
		topicId: "english_vocabulary",
		score: 75,
		duration: 240000,
	}, // 4 minutes
	{
		id: "lb_005",
		userId: "user_004",
		topicId: "science",
		score: 89,
		duration: 170000,
	}, // 2.83 minutes
	{
		id: "lb_006",
		userId: "user_002",
		topicId: "english_vocabulary",
		score: 82,
		duration: 220000,
	}, // 3.66 minutes
];

// Export all data
export default {
	allQuestions,
	topics,
	users,
	leaderboard,
};
