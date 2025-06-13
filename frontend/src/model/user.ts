export type User = {
	id: string;
	email: string;
	name: string;
};

export type Topic = {
	id: string;
	name: string;
};

export type Questions = {
	id: string;
	topicId: string;
	question: string;
	answer: string[];
	correctAnswer: string;
};

export type Leaderboard = {
	id: string;
	userId: string;
	topicId: string;
	score: number;
	duration: number;
};
