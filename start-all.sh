#!/bin/bash

# Function to check if port is available
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "Port $1 is already in use. Please free up port $1 and try again."
        exit 1
    fi
}

# Check ports
check_port 3001
check_port 3000

echo "Starting Ravi Ram Tech Talks LMS..."
echo "===================================="

# Start backend
echo "Starting backend server on port 3001..."
cd my-backend
npm install
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 5

# Start frontend  
echo "Starting frontend server on port 3000..."
cd myapp-frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo "===================================="
echo "Backend running on: http://localhost:3001"
echo "Frontend running on: http://localhost:3000"
echo "===================================="
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap 'kill $BACKEND_PID $FRONTEND_PID; exit' INT
wait