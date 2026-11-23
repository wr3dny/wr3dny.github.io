@echo off
setlocal
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (
 echo Brak npm. Zainstaluj Node.js i otworz ten plik ponownie.
 pause
 exit /b 1
)
if not exist node_modules (
 call npm ci
 if errorlevel 1 (
  pause
  exit /b 1
 )
)
call npm run dev -- --open
pause
