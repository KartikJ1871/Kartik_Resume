@echo off
title Kartik Jadhav Portfolio
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8000
  py -m http.server 8000
  goto end
)
where python >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8000
  python -m http.server 8000
  goto end
)
echo Python was not found. Install Python 3 from https://www.python.org/downloads/
echo During setup, select "Add Python to PATH", then run this file again.
pause
:end
