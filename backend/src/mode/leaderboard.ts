import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });

const TABLE_NAME = process.env.LEADERBOARD_TABLE_NAME || "Leaderboard";

export const createLeaderboardEntry = async (entry: {
  userId: string;
  username: string;
  topicId: string;
  score: number;
  duration: number;
}) => {
  const now = new Date().toISOString();

  const item = {
    id: { S: randomUUID() },
    userId: { S: entry.userId },
    username: { S: entry.username },
    topicId: { S: entry.topicId },
    score: { N: entry.score.toString() },
    duration: { N: entry.duration.toString() },
    createdAt: { S: now },
  };

  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };

  try {
    await dynamoDB.send(new PutItemCommand(params));
    return {
      ...entry,
      createdAt: now,
    };
  } catch (error) {
    console.error("ERROR: Failed to create leaderboard entry:", error);
    throw error;
  }
};

export const getLeaderboardEntries = async (topicId?: string): Promise<any[]> => {
  let params: any = {
    TableName: TABLE_NAME,
  };

  if (topicId) {
    params.FilterExpression = "topicId = :topicId";
    params.ExpressionAttributeValues = {
      ":topicId": { S: topicId },
    };
  }

  try {
    const result = await dynamoDB.send(new ScanCommand(params));

    const entries = (result.Items || []).map((item) => ({
      id: item.id.S!,
      userId: item.userId.S!,
      username: item.username?.S || "Unknown",
      topicId: item.topicId.S!,
      score: parseInt(item.score.N!),
      duration: parseInt(item.duration.N!),
      createdAt: item.createdAt.S!,
    }));

    entries.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.duration - b.duration;
    });

    return entries;
  } catch (error) {
    console.error("ERROR: Failed to get leaderboard entries:", error);
    throw error;
  }
};
