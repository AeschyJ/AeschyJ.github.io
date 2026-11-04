@echo off
cd /d "%~dp0"
title Push Project to GitHub

echo ==============================================================================
echo [GitHub Sync] Starting safe Git staging, commit and push...
echo Target Remote: https://github.com/AeschyJ/AeschyJ.github.io.git
echo ==============================================================================
echo.

echo Step 1: Checking Git status...
git status
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Git status check failed. Ensure git is installed and in PATH.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Step 2: Staging sanitized repository files...
git add .
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Git add failed.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Step 3: Checking if commit is needed...
git diff --cached --quiet
if %ERRORLEVEL% neq 0 (
    echo Committing changes...
    set "COMMIT_MSG=%~1"
    if "%COMMIT_MSG%"=="" set "COMMIT_MSG=fix(layout): anchor pavilions 03 and 04 headers and refine english titles to v3.1.0"
    git commit -m "%COMMIT_MSG%"
    if errorlevel 1 (
        echo.
        echo [ERROR] Git commit failed.
        pause
        exit /b %ERRORLEVEL%
    )
) else (
    echo Working tree clean, nothing to commit.
)

echo.
echo Step 4: Pushing to remote main branch...
git push origin main
if %ERRORLEVEL% equ 0 (
    echo.
    echo ==============================================================================
    echo [SUCCESS] Project pushed to GitHub successfully!
    echo ==============================================================================
) else (
    echo.
    echo ==============================================================================
    echo [ERROR] Git push failed.
    echo Please check network connection, GitHub authentication or remote permissions.
    echo Remote repository: https://github.com/AeschyJ/AeschyJ.github.io.git
    echo ==============================================================================
    pause
    exit /b %ERRORLEVEL%
)

echo.
pause
