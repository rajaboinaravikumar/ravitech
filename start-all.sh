#!/bin/bash

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Start backend server in the background
echo "Starting backend server on port 3001..."
(cd "$SCRIPT_DIR/my-backend" && node server.js) &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "Starting frontend server on port 5000..."
cd "$SCRIPT_DIR/myapp-frontend" && npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
