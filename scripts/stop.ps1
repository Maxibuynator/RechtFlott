$ErrorActionPreference = "Stop"

$port = 8000
$connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue

if (-not $connections) {
  Write-Host "Kein Server auf Port $port gefunden."
  exit 0
}

$connections | ForEach-Object {
  Stop-Process -Id $_.OwningProcess -Force
}

Write-Host "Server auf Port $port beendet."
