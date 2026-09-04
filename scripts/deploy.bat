@echo off
cd /d "%~dp0"
chcp 65001 >nul
setlocal EnableExtensions EnableDelayedExpansion
title GitHub Pages Deploy Pipeline Architect
set PYTHONIOENCODING=utf-8

:: Check if Python is available
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python is not installed or not in PATH!
    pause
    exit /b 1
)

:: If CLI arguments provided, pass directly to deploy.py
if not "%~1"=="" (
    python "%~dp0deploy.py" %*
    exit /b %ERRORLEVEL%
)

:: Launch interactive menu via Python
python "%~dp0deploy.py" --menu
exit /b %ERRORLEVEL%
