# Quiz App Backend

A TypeScript Express.js API designed to run on AWS Lambda for a quiz application.

## Features

- **GET /health** - Health check endpoint
- **GET /topics** - Retrieve all quiz topics
- **GET /topics/:id** - Get questions for a specific topic
- **POST /topics** - Create a new topic
- **POST /leaderboard** - Submit user scores
- **GET /leaderboard** - View leaderboard (bonus endpoint)

## Project Structure

```
backend/
├── index.ts           # Main application file
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── serverless.yml     # Serverless Framework configuration
└── dist/              # Compiled JavaScript (after build)
```

## Local Development

### Prerequisites
- Node.js 18+ 
- npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server (requires build first)
- `npm run deploy` - Build and deploy to AWS Lambda

## API Endpoints

### GET /topics
Returns all available quiz topics.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "JavaScript Fundamentals",
      "description": "Basic JavaScript concepts and syntax",
      "questionCount": 10,
      "difficulty": "beginner",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "count": 1
}
```

### GET /topics/:id
Returns questions for a specific topic.

**Response:**
```json
{
  "success": true,
  "data": {
    "topicId": "1",
    "questions": [
      {
        "id": "1",
        "topicId": "1",
        "question": "What is the difference between let and var in JavaScript?",
        "options": ["No difference", "let has block scope, var has function scope", "..."],
        "correctAnswer": 1,
        "explanation": "let has block scope while var has function scope",
        "difficulty": "beginner",
        "points": 10
      }
    ]
  },
  "count": 1
}
```

### POST /topics
Create a new topic.

**Request Body:**
```json
{
  "name": "New Topic",
  "description": "Topic description",
  "difficulty": "beginner"
}
```

### POST /leaderboard
Submit a user's quiz score.

**Request Body:**
```json
{
  "userId": "user123",
  "username": "johndoe",
  "topicId": "1",
  "score": 8,
  "totalQuestions": 10
}
```

## AWS Lambda Deployment

### Prerequisites
- AWS CLI configured with appropriate permissions
- Serverless Framework installed globally: `npm install -g serverless`

### Environment Variables
Set these environment variables in AWS Lambda or locally for testing:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing

### Deploy to AWS

1. Build the project:
```bash
npm run build
```

2. Deploy using Serverless Framework:
```bash
serverless deploy
```

Or use the combined command:
```bash
npm run deploy
```

### Local Lambda Testing
You can test the Lambda function locally using:
```bash
serverless offline
```

## Technology Stack

- **Runtime**: Node.js 18.x
- **Framework**: Express.js 4.x
- **Language**: TypeScript
- **Deployment**: AWS Lambda via Serverless Framework
- **Database**: MongoDB (ready for integration)
- **Authentication**: JWT (ready for integration)

## Current Status

This is the initial version with mock data. The following features are ready for implementation:

- [ ] MongoDB integration for persistent data
- [ ] User authentication with JWT
- [ ] Input validation and sanitization
- [ ] Rate limiting
- [ ] Logging and monitoring
- [ ] Unit and integration tests

## API Testing

You can test the API endpoints using curl or any HTTP client:

```bash
# Get all topics
curl https://your-api-gateway-url/topics

# Get questions for topic 1
curl https://your-api-gateway-url/topics/1

# Create a new topic
curl -X POST https://your-api-gateway-url/topics \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Topic","description":"Test description","difficulty":"beginner"}'

# Submit a score
curl -X POST https://your-api-gateway-url/leaderboard \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","username":"testuser","topicId":"1","score":8,"totalQuestions":10}'
```

## Error Handling

The API includes comprehensive error handling:
- 400 Bad Request for invalid input
- 404 Not Found for non-existent resources
- 500 Internal Server Error for server issues

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

# 1. Submit a new leaderboard entry (POST)
curl -X POST https://jq502bun1g.execute-api.us-east-1.amazonaws.com/dev/leaderboard \
-H "Content-Type: application/json" \
-d '{
"userId": "user777",
"username": "Sel",
"email": "sel@example.com",
"avatarUrl": "https://example.com/avatar.jpg",
"topicId": "math",
"score": 99,
"duration": 110
}'

# 2. Get leaderboard entries for a topic (GET)
curl "https://jq502bun1g.execute-api.us-east-1.amazonaws.com/dev/leaderboard?topicId=math"
