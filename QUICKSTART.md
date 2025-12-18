# Quick Start Guide

## Step 1: Install Dependencies

```powershell
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

## Step 2: Start the Application

### Option A: Run both servers concurrently (recommended)
```powershell
npm run dev
```

This will start:
- Backend server on http://localhost:3001
- Frontend dev server on http://localhost:3000

### Option B: Run servers separately

**Terminal 1 - Backend:**
```powershell
npm run dev:server
```

**Terminal 2 - Frontend:**
```powershell
npm run dev:client
```

## Step 3: Access the Application

Open your browser and navigate to: **http://localhost:3000**

## Testing the API

You can test the API endpoints directly:

### Get all todos
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/todos" -Method Get
```

### Create a todo
```powershell
$body = @{
    title = "Test Todo"
    text = "This is a test todo"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/todos" -Method Post -Body $body -ContentType "application/json"
```

## Building for Production

```powershell
# Build both client and server
npm run build

# Start production server
npm start
```

The production server will serve the React app on http://localhost:3001

## Troubleshooting

### Port already in use
If you get an error that port 3001 or 3000 is already in use:

```powershell
# Find processes using the ports
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue).OwningProcess
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue).OwningProcess

# Stop node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Dependencies not installed
```powershell
npm run install:all
```

