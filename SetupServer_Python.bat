echo off
start "" "http://127.0.0.1:8000/"
python -m http.server 8000
pause