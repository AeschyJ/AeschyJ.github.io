@echo off
cd /d "%~dp0"
chcp 65001 >nul
setlocal EnableExtensions EnableDelayedExpansion
title GitHub Pages Deploy Pipeline Architect
set PYTHONIOENCODING=utf-8

:: Forward all commands to scripts/deploy.bat
call "%~dp0scripts\deploy.bat" %*
exit /b %ERRORLEVEL%
