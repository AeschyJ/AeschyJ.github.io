@echo off
cd /d "%~dp0"
title Central Portal Hub Preview Server
echo ====================================================
echo   Central Innovation Portal - Local Dev Server
echo ====================================================
echo.
echo Launching browser at http://localhost:8000 ...
start http://localhost:8000
echo.
echo Server running at http://localhost:8000
echo Press Ctrl+C to stop the server.
echo ====================================================
python -m http.server 8000
if %errorlevel% neq 0 (
    echo Python server failed, trying npx serve...
    npx serve . -l 8000
)
pause