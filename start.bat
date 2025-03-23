@echo off
REM Check if node_modules folder exists
IF NOT EXIST "node_modules" (
    echo Installing dependencies...
    npm install
) ELSE (
    echo Dependencies already installed.
)

echo Starting Express.js server...
npm start

pause