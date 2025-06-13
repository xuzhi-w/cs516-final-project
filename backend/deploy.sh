#!/bin/bash

# Quiz App Backend Deployment Script

echo "🚀 Starting deployment process..."

# Check if AWS CLI is configured
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if Serverless is installed
if ! command -v serverless &> /dev/null; then
    echo "❌ Serverless Framework is not installed. Installing globally..."
    npm install -g serverless
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building TypeScript..."
npm run build

# Deploy to AWS Lambda
echo "☁️  Deploying to AWS Lambda..."
serverless deploy

echo "✅ Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Note the API Gateway URL from the deployment output"
echo "2. Test your endpoints using the provided URL"
echo "3. Set up environment variables in AWS Lambda console if needed"
echo ""
echo "🔗 Test your API:"
echo "curl https://your-api-gateway-url/health"
