@echo off
setlocal

set "APP_DIR=%~dp0"
set "PORT=4173"
set "URL=http://localhost:%PORT%/"
set "BUNDLED_PY=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $client = New-Object Net.Sockets.TcpClient('127.0.0.1', %PORT%); $client.Close(); exit 0 } catch { exit 1 }" >nul 2>nul
if errorlevel 1 (
  if exist "%BUNDLED_PY%" (
    start "DigiArt LED Server" /min "%BUNDLED_PY%" -m http.server %PORT% --bind 127.0.0.1 --directory "%APP_DIR%"
  ) else (
    start "DigiArt LED Server" /min python -m http.server %PORT% --bind 127.0.0.1 --directory "%APP_DIR%"
  )
  timeout /t 1 /nobreak >nul
)

start "" "%URL%"
endlocal
