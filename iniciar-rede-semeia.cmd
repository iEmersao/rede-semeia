@echo off
setlocal
set "PROJETO=%~dp0"
set "VP=%PROJETO%node_modules\.bin\vp.cmd"

if not exist "%VP%" (
  echo Dependencias nao encontradas. Abra um terminal nesta pasta e execute: vp install
  pause
  exit /b 1
)

start "Rede Semeia - API" /D "%PROJETO%" cmd /k ""%VP%" run api"
start "Rede Semeia - Site" /D "%PROJETO%" cmd /k ""%VP%" dev"
timeout /t 3 /nobreak >nul
start "" "http://localhost:5173"
endlocal

