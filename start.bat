@echo off
echo Setting up Vite with React and Express.js...

:: Check if Node.js is installed
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b
)

:: Install Vite with React
echo Creating Vite React project...
npx create-vite@latest my-vite-app -- --template react

:: Navigate to project folder
cd my-vite-app

:: Install Vite dependencies
echo Installing Vite dependencies...
npm install

:: Set up Express.js backend
echo Setting up Express.js backend...
mkdir server
cd server
npm init -y

:: Install Express and nodemon
npm install express
npm install -D nodemon

:: Create a simple Express server
echo Creating server.js file...
echo const express = require('express'); > server.js
echo const app = express(); >> server.js
echo const PORT = 3000; >> server.js
echo app.use(express.json()); >> server.js
echo app.get('/', (req, res) => res.send('Hello from Express!')); >> server.js
echo app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); >> server.js

:: Add start script to package.json
echo Adding start script...
(for /f "delims=" %%i in ('type package.json') do (
    echo %%i | findstr /c:""scripts"": { >nul
    if %ERRORLEVEL%==0 (
        echo   "start": "nodemon server.js", >> package.json
    ) else (
        echo %%i >> temp.json
    )
))
move /Y temp.json package.json >nul

:: Go back to root folder
cd ..

:: Start both Vite and Express servers
echo Starting Vite and Express servers...
start /B npm run dev
cd server
start /B npm start

pause