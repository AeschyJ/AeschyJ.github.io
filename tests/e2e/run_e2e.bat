@echo off
cd /d "%~dp0"
set "PYTHONPATH=%~dp0..\..;%PYTHONPATH%"
echo ========================================================
echo   E2E Test Suite Launcher (hub-portal-cache-v3)
echo ========================================================
echo Running E2E Test Suite via Python...
if exist "..\..\.venv\Scripts\python.exe" (
    "..\..\.venv\Scripts\python.exe" runner.py %*
) else (
    python runner.py %*
)
set "EXIT_CODE=%errorlevel%"
if %EXIT_CODE% equ 0 (
    echo [E2E] SUCCESS - All tests passed with exit code 0.
    exit /b 0
)
echo [E2E] FAILURE - Tests finished with exit code %EXIT_CODE%.
pause
exit /b %EXIT_CODE%
