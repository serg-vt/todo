# Start TODO App Development Servers

Write-Host "Starting TODO App..." -ForegroundColor Green
Write-Host ""

# Check if dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing root dependencies..." -ForegroundColor Yellow
    npm install
}

if (-not (Test-Path "client/node_modules")) {
    Write-Host "Installing client dependencies..." -ForegroundColor Yellow
    Set-Location client
    npm install
    Set-Location ..
}

Write-Host ""
Write-Host "Starting backend server on http://localhost:3001..." -ForegroundColor Cyan
Write-Host "Starting frontend server on http://localhost:3000..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Start both servers using npm run dev
npm run dev

