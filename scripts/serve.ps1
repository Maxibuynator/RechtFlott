$ErrorActionPreference = "Stop"

$python = "C:/Max/RechtFlott/.venv/Scripts/python.exe"
$port = 8000
$url = "http://localhost:$port/index.html"

Start-Process $url
& $python -m http.server $port
