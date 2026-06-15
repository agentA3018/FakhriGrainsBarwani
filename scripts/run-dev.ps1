param(
    [int]$Port = 3000
)

function Command-Exists($name) {
    return (Get-Command $name -ErrorAction SilentlyContinue) -ne $null
}

if (-not (Command-Exists "node")) {
    Write-Host "Node.js is not installed. Please install Node LTS from https://nodejs.org/ or use nvm-windows." -ForegroundColor Red
    exit 1
}

$pnpmCmd = $null
if (Command-Exists "pnpm") {
    $pnpmCmd = "pnpm"
} elseif (Command-Exists "npx") {
    $pnpmCmd = "npx pnpm"
} elseif (Command-Exists "npm") {
    $pnpmCmd = "npm exec -- pnpm"
}

if ($pnpmCmd) {
    Write-Host "Using pnpm command: $pnpmCmd" -ForegroundColor Green
    Write-Host "Installing dependencies..."
    iex "$pnpmCmd install"
} else {
    Write-Host "pnpm/npx not found; falling back to npm." -ForegroundColor Yellow
    Write-Host "Installing dependencies with npm..."
    npm install
}

# Start dev server in a new PowerShell window so this script can continue to open the browser
$devCommand = $null
if ($pnpmCmd) {
    $devCommand = "$pnpmCmd dev"
} else {
    $devCommand = "npm run dev"
}

Write-Host "Starting dev server: $devCommand" -ForegroundColor Green
$escapedCmd = $devCommand -replace '"','\"'
Start-Process -FilePath "powershell" -ArgumentList "-NoExit","-Command","cd \"$PWD\"; $escapedCmd"

Start-Sleep -Seconds 2

# Try to open in Chrome
$localUrl = "http://localhost:$Port"
if (Command-Exists "chrome") {
    Start-Process "chrome" $localUrl
} else {
    $chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    if (Test-Path $chromePath) {
        Start-Process $chromePath $localUrl
    } else {
        Write-Host "Chrome not found on PATH. Open $localUrl manually in your browser." -ForegroundColor Yellow
    }
}

Write-Host "Dev server should be starting in the new window. Opened $localUrl if Chrome was found." -ForegroundColor Cyan
