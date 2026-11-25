@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================================================
echo METHALOX SYSTEMS AG — GITHUB CLOUD-SYNC (PC ^& LAPTOP)
echo ============================================================================
set "GIT_EXE=git"
if exist "%LOCALAPPDATA%\GitHubDesktop\app-3.6.11\resources\app\git\cmd\git.exe" (
    set "GIT_EXE=%LOCALAPPDATA%\GitHubDesktop\app-3.6.11\resources\app\git\cmd\git.exe"
)
echo [1/3] Lade neuesten Stand von GitHub herunter (git pull --rebase)...
"%GIT_EXE%" pull --rebase --autostash origin main
echo [2/3] Speichere lokale Aenderungen (git add ^& commit)...
"%GIT_EXE%" add -A
"%GIT_EXE%" commit -m "Sync Update %DATE% %TIME%" 2>nul
echo [3/3] Lade aktuellen Stand auf GitHub hoch (git push)...
"%GIT_EXE%" push origin main
echo ============================================================================
echo FERTIG! Alle Aenderungen sind auf GitHub und GitHub Pages synchronisiert.
echo Live-Link: https://geezer0000.github.io/Methalox-Systems/
echo ============================================================================
pause
