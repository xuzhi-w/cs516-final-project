import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import serverless from "serverless-http";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware (if needed for frontend)
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);

	if (req.method === "OPTIONS") {
		res.sendStatus(200);
	} else {
		next();
	}
});

// Health check route
app.get("/health", (req: Request, res: Response) => {
	res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// GET /topics - Retrieve all topics
app.get("/topics", async (req: Request, res: Response) => {
	try {
		// TODO: Replace with actual MongoDB query
		const mockTopics = [
			{
				id: "1",
				name: "JavaScript Fundamentals",
				description: "Basic JavaScript concepts and syntax",
				questionCount: 10,
				difficulty: "beginner",
				createdAt: "2024-01-01T00:00:00Z",
			},
			{
				id: "2",
				name: "React Hooks",
				description: "Understanding React Hooks and their usage",
				questionCount: 15,
				difficulty: "intermediate",
				createdAt: "2024-01-02T00:00:00Z",
			},
			{
				id: "3",
				name: "Node.js & Express",
				description: "Backend development with Node.js and Express",
				questionCount: 12,
				difficulty: "intermediate",
				createdAt: "2024-01-03T00:00:00Z",
			},
		];

		res.json({
			success: true,
			data: mockTopics,
			count: mockTopics.length,
		});
	} catch (error) {
		console.error("Error fetching topics:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch topics",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
});

// GET /topics/:id - Retrieve questions for a specific topic
app.get("/topics/:id", async (req: Request, res: Response) => {
	try {
		const topicId = req.params.id;

		// TODO: Replace with actual MongoDB query
		const mockQuestions = [
			{
				id: "1",
				topicId: topicId,
				question:
					"What is the difference between let and var in JavaScript?",
				options: [
					"No difference",
					"let has block scope, var has function scope",
					"var has block scope, let has function scope",
					"Both have global scope",
				],
				correctAnswer: 1,
				explanation: "let has block scope while var has function scope",
				difficulty: "beginner",
				points: 10,
			},
			{
				id: "2",
				topicId: topicId,
				question:
					"Which of the following is NOT a JavaScript data type?",
				options: ["string", "boolean", "float", "undefined"],
				correctAnswer: 2,
				explanation:
					'JavaScript uses "number" for all numeric values, not separate int/float types',
				difficulty: "beginner",
				points: 10,
			},
			{
				id: "3",
				topicId: topicId,
				question:
					'What does the "this" keyword refer to in JavaScript?',
				options: [
					"The current function",
					"The global object",
					"The object that called the function",
					"The parent object",
				],
				correctAnswer: 2,
				explanation:
					'"this" refers to the object that called the function (context-dependent)',
				difficulty: "intermediate",
				points: 15,
			},
		];

		// Check if topic exists (mock validation)
		const validTopicIds = ["1", "2", "3"];
		if (!validTopicIds.includes(topicId)) {
			return res.status(404).json({
				success: false,
				message: "Topic not found",
			});
		}

		res.json({
			success: true,
			data: {
				topicId: topicId,
				questions: mockQuestions,
			},
			count: mockQuestions.length,
		});
	} catch (error) {
		console.error("Error fetching questions:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch questions",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
});

// POST /topics - Create a new topic
app.post("/topics", async (req: Request, res: Response) => {
	try {
		const { name, description, difficulty } = req.body;

		// Basic validation
		if (!name || !description) {
			return res.status(400).json({
				success: false,
				message: "Name and description are required",
			});
		}

		// TODO: Replace with actual MongoDB insertion
		const mockNewTopic = {
			id: Math.random().toString(36).substr(2, 9), // Generate random ID
			name,
			description,
			difficulty: difficulty || "beginner",
			questionCount: 0,
			createdAt: new Date().toISOString(),
		};

		res.status(201).json({
			success: true,
			message: "Topic created successfully",
			data: mockNewTopic,
		});
	} catch (error) {
		console.error("Error creating topic:", error);
		res.status(500).json({
			success: false,
			message: "Failed to create topic",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
});

// POST /leaderboard - Submit user score
app.post("/leaderboard", async (req: Request, res: Response) => {
	try {
		const {
			userId,
			username,
			topicId,
			score,
			totalQuestions,
			completedAt,
		} = req.body;

		// Basic validation
		if (
			!userId ||
			!username ||
			!topicId ||
			score === undefined ||
			!totalQuestions
		) {
			return res.status(400).json({
				success: false,
				message:
					"userId, username, topicId, score, and totalQuestions are required",
			});
		}

		// Validate score
		if (score < 0 || score > totalQuestions) {
			return res.status(400).json({
				success: false,
				message: "Invalid score: must be between 0 and total questions",
			});
		}

		// TODO: Replace with actual MongoDB insertion
		const mockLeaderboardEntry = {
			id: Math.random().toString(36).substr(2, 9),
			userId,
			username,
			topicId,
			score,
			totalQuestions,
			percentage: Math.round((score / totalQuestions) * 100),
			completedAt: completedAt || new Date().toISOString(),
			submittedAt: new Date().toISOString(),
		};

		// Mock current leaderboard position
		const mockPosition = Math.floor(Math.random() * 100) + 1;

		res.status(201).json({
			success: true,
			message: "Score submitted successfully",
			data: {
				entry: mockLeaderboardEntry,
				position: mockPosition,
				totalEntries: mockPosition + Math.floor(Math.random() * 50),
			},
		});
	} catch (error) {
		console.error("Error submitting score:", error);
		res.status(500).json({
			success: false,
			message: "Failed to submit score",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
});

// GET /leaderboard - Get leaderboard (bonus route for testing)
app.get("/leaderboard", async (req: Request, res: Response) => {
	try {
		const { topicId, limit = 10 } = req.query;

		// TODO: Replace with actual MongoDB query
		const mockLeaderboard = [
			{
				id: "1",
				userId: "user1",
				username: "johndoe",
				topicId: topicId || "1",
				score: 10,
				totalQuestions: 10,
				percentage: 100,
				completedAt: "2024-01-01T10:00:00Z",
				position: 1,
			},
			{
				id: "2",
				userId: "user2",
				username: "janedoe",
				topicId: topicId || "1",
				score: 9,
				totalQuestions: 10,
				percentage: 90,
				completedAt: "2024-01-01T11:00:00Z",
				position: 2,
			},
			{
				id: "3",
				userId: "user3",
				username: "bobsmith",
				topicId: topicId || "1",
				score: 8,
				totalQuestions: 10,
				percentage: 80,
				completedAt: "2024-01-01T12:00:00Z",
				position: 3,
			},
		];

		const limitedResults = mockLeaderboard.slice(0, Number(limit));

		res.json({
			success: true,
			data: limitedResults,
			count: limitedResults.length,
			filters: {
				topicId: topicId || "all",
				limit: Number(limit),
			},
		});
	} catch (error) {
		console.error("Error fetching leaderboard:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch leaderboard",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
});

// 404 handler
app.use("*", (req: Request, res: Response) => {
	res.status(404).json({
		success: false,
		message: "Route not found",
	});
});

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: any) => {
	console.error("Unhandled error:", error);
	res.status(500).json({
		success: false,
		message: "Internal server error",
		error:
			process.env.NODE_ENV === "development"
				? error.message
				: "Something went wrong",
	});
});

// For local development
if (process.env.NODE_ENV !== "production") {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

// Export for AWS Lambda
export const handler = serverless(app);
