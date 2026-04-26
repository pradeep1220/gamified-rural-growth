#!/bin/bash
# EduFlow LMS — Quick Start Script

echo ""
echo "╔══════════════════════════════════════╗"
echo "║       🎓 EduFlow LMS Startup         ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Please install Node.js v18+"
  exit 1
fi

# Check MongoDB
if ! command -v mongod &> /dev/null && ! pgrep mongod > /dev/null; then
  echo "⚠️  MongoDB not detected locally. Make sure MongoDB is running or use Atlas URI in .env"
fi

# Setup Backend
echo "📦 Installing backend dependencies..."
cd backend && npm install --silent

# Check .env
if [ ! -f .env ]; then
  echo "⚙️  Creating .env from example..."
  cp .env.example .env
  echo "✏️  Please edit backend/.env with your MongoDB URI and JWT secret"
fi

# Seed database
echo ""
read -p "🌱 Seed database with demo data? (y/n): " seed
if [ "$seed" == "y" ]; then
  node utils/seed.js
fi

# Start backend in background
echo ""
echo "🚀 Starting backend on http://localhost:5000 ..."
npm run dev &
BACKEND_PID=$!

# Setup Frontend
echo "📦 Installing frontend dependencies..."
cd ../frontend && npm install --silent

echo "🎨 Starting frontend on http://localhost:5173 ..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  ✅ EduFlow LMS is running!                  ║"
echo "║                                              ║"
echo "║  Frontend: http://localhost:5173             ║"
echo "║  Backend:  http://localhost:5000/api/health  ║"
echo "║                                              ║"
echo "║  Demo Logins:                                ║"
echo "║  Admin:      admin@lms.com / admin123        ║"
echo "║  Instructor: instructor@lms.com / inst123    ║"
echo "║  Learner:    learner@lms.com / learner123    ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
