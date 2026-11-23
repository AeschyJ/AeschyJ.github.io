@echo off
cd /d "%~dp0"
if "%PORT%"=="" set "PORT=5173"
set "PS_EXE=powershell"
pwsh -v >nul 2>&1 && set "PS_EXE=pwsh"
%PS_EXE% -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\ctl.ps1" %*
set "EXIT_CODE=%errorlevel%"
if %EXIT_CODE% neq 0 (
    echo.
    echo ======================================================================
    echo [CRASH] Script terminated abnormally with exit code: %EXIT_CODE%
    echo Timestamp: %date% %time%
    echo ======================================================================
    echo [%date% %time%] scripts\ctl.ps1 failed with exit code: %EXIT_CODE% >> "%~dp0launcher_crash.log"
    pause
    exit /b %EXIT_CODE%
)
