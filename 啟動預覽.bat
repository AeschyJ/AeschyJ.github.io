@echo off
cd /d "%~dp0"
title Central Portal Hub Preview Server
echo ====================================================
echo   Central Innovation Portal - Local Dev Server
echo ====================================================
echo.

if "%PORT%"=="" set PORT=5173

echo Launching browser at http://localhost:%PORT% ...
start http://localhost:%PORT%
echo.
echo Server running at http://localhost:%PORT%
echo Press Ctrl+C to stop the server.
echo ====================================================

python -m http.server %PORT%
if %errorlevel% neq 0 (
    echo Python server failed, trying npx serve...
    npx serve . -l %PORT%
)
pause