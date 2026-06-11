@echo off
REM ============================================================
REM  PRM – Lokaler Webserver (Windows)
REM  Doppelklick auf diese Datei startet den Server
REM  und öffnet den Browser automatisch.
REM ============================================================

cd /d "%~dp0"

SET PORT=8080

echo ========================================
echo   PRM Webserver läuft auf Port %PORT%
echo   http://localhost:%PORT%
echo   Fenster schließen = Server stoppen
echo ========================================

REM Browser nach kurzer Pause öffnen
start "" timeout /t 1 /nobreak >nul
start "" "http://localhost:%PORT%/index.html"

REM Python-Server starten
python -m http.server %PORT%

pause
