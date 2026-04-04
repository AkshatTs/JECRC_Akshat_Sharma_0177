# Quick Start Guide: Running Bill Generator System

## Prerequisites Checklist

- ✅ .NET 8.0 SDK installed
- ✅ Node.js 16+ installed  
- ✅ SQL Server Express or SSMS installed
- ✅ Frontend: `npm install` completed
- ✅ Backend: `dotnet build` succeeded

---

## Step 1: Set Up SQL Server Connection

### Option A: Using SQL Server Express (Local)

The default connection string works with local SQL Server:

```
Server=(localdb)\mssqllocaldb;Database=BillGeneratorDb;Trusted_Connection=true;
```

**No configuration needed** - it will auto-create the database on first run.

### Option B: Using SQL Server Management Studio (SSMS)

1. **Install SSMS** (if not already installed)
   - Download: https://docs.microsoft.com/sql/ssms/download-sql-server-management-studio-ssms
   - Install with default settings

2. **Open SSMS**
   - Launch from Start Menu → "SQL Server Management Studio 20"

3. **Connect to Your Server**
   - Server name: `(localdb)\mssqllocaldb` or `.`
   - Authentication: Windows Authentication
   - Click "Connect"

4. **View Databases**
   - After first run, you'll see `BillGeneratorDb` under Databases folder

---

## Step 2: Edit Database Connection String (if needed)

### File to Edit:
`d:\billsystem\backend\BillGeneratorAPI\appsettings.json`

### Default (Works with Local SQL Server Express):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=BillGeneratorDb;Trusted_Connection=true;"
  }
}
```

### If Using Different Server:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=BillGeneratorDb;Trusted_Connection=true;"
  }
}
```

---

## Step 3: Edit Frontend Configuration

### File to Edit:
`d:\billsystem\frontend\.env`

### Content:
```
REACT_APP_API_URL=https://localhost:7160/api
```

**If file doesn't exist, create it:**
```powershell
cd d:\billsystem\frontend
"REACT_APP_API_URL=https://localhost:7160/api" | Out-File -FilePath .env -Encoding utf8
```

---

## Step 4: Run Backend (Terminal 1)

```powershell
cd d:\billsystem\backend\BillGeneratorAPI

# First time only - create database
dotnet ef database update

# Run the API
dotnet run
```

**Expected Output:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7160
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5160
```

✅ **API Running**: Open browser → https://localhost:7160/swagger

---

## Step 5: Run Frontend (Terminal 2)

```powershell
cd d:\billsystem\frontend

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view bill-generator-frontend in the browser.
Local:  http://localhost:3000
```

✅ **Frontend Running**: Browser opens → http://localhost:3000

---

## Step 6: Verify Everything Works

1. **Backend API Running?**
   - Visit: https://localhost:7160/swagger
   - Should see blue Swagger documentation

2. **Frontend Running?**
   - Visit: http://localhost:3000
   - Should see Bill Generator interface

3. **Can they talk?**
   - In frontend, go to "Create Bill"
   - Select an item
   - Try to save
   - Should work without errors

---

## Quick Command Reference

### Open Two PowerShell Terminals

**Terminal 1 - Backend:**
```powershell
cd d:\billsystem\backend\BillGeneratorAPI
dotnet run
```

**Terminal 2 - Frontend:**
```powershell
cd d:\billsystem\frontend
npm start
```

### Keep Both Running
- Terminal 1: Backend (stays running)
- Terminal 2: Frontend (stays running)
- Browser: Open http://localhost:3000

---

## File Locations for Quick Edits

| Purpose | File Path | Edit For |
|---------|-----------|----------|
| Database Connection | `d:\billsystem\backend\BillGeneratorAPI\appsettings.json` | Different SQL Server |
| Frontend API URL | `d:\billsystem\frontend\.env` | Different API endpoint |
| Frontend Port | `d:\billsystem\frontend\package.json` | Change from 3000 (advanced) |
| Backend Port | `d:\billsystem\backend\BillGeneratorAPI\Properties\launchSettings.json` | Change from 7160 (advanced) |

---

## Stopping the Services

**Terminal 1 (Backend):**
```
Press Ctrl + C
```

**Terminal 2 (Frontend):**
```
Press Ctrl + C
```

---

## Using SSMS to View Data

After creating bills:

1. **Open SSMS**
2. **Navigate**: Databases → BillGeneratorDb → Tables
3. **View Bills**: Right-click `Bills` → Select Top 1000 Rows
4. **View Items**: Right-click `BillItems` → Select Top 1000 Rows
5. **View Catalogs**: Right-click `CatalogItems` → Select Top 1000 Rows

---

## Troubleshooting

### Backend won't start
```powershell
# Clear cache and rebuild
rm -r bin, obj
dotnet clean
dotnet build
dotnet run
```

### Frontend won't start
```powershell
cd d:\billsystem\frontend
rm node_modules -r
npm install
npm start
```

### Port already in use
```powershell
# Find process on port 7160
netstat -ano | findstr :7160
# Kill it (replace PID)
taskkill /PID your_pid /F
```

### Database connection error
- Verify SQL Server is running
- Check connection string in appsettings.json
- Run: `dotnet ef database update`

### CORS/API errors
- Ensure backend is running on https://localhost:7160
- Check .env file has correct REACT_APP_API_URL
- Clear browser cache

---

## Development Workflow

### While Developing:

1. **Backend Changes**: Edit C# files → Save → Auto-recompile
2. **Frontend Changes**: Edit React files → Save → Auto-refresh
3. **Database Changes**: Edit Model → Create Migration → Update Database
4. **Keep checking**: Browser DevTools Console for errors

### Create a Database Migration (if adding fields):
```powershell
cd d:\billsystem\backend\BillGeneratorAPI

# Create migration
dotnet ef migrations add YourMigrationName

# Apply to database
dotnet ef database update
```

---

## Next Steps

1. ✅ Run both backend and frontend
2. ✅ Create a test bill
3. ✅ Export as PDF
4. ✅ Add custom catalog items
5. ✅ View past bills in history

---

**Created**: 2026
**For**: Windows 10/11
**Project**: Bill Generator System v1.0
