# Multi-Catalog Bill Generator System - Setup Guide for Windows

## Complete Setup Instructions for Windows

### Step 1: Initial System Check

1. **Verify .NET SDK Installation**
```powershell
dotnet --version
```
Expected: .NET 6.0 or higher

2. **Verify Node.js Installation**
```powershell
node --version
npm --version
```
Expected: Node 16+ and npm 7+

3. **Verify SQL Server/Express**
- SQL Server should be installed and running
- Default: `(localdb)\mssqllocaldb`

### Step 2: Database Setup

1. **Open PowerShell as Administrator**

2. **Create Database (Optional - EF will create it)**
```powershell
cd d:\billsystem\backend\BillGeneratorAPI
```

3. **Install Entity Framework CLI (if not already installed)**
```powershell
dotnet tool install --global dotnet-ef
```

4. **Create Initial Migration and Database**
```powershell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Step 3: Backend Setup

1. **Navigate to backend folder**
```powershell
cd d:\billsystem\backend\BillGeneratorAPI
```

2. **Build the project**
```powershell
dotnet build
```

3. **Run the API**
```powershell
dotnet run
```

Expected output:
```
Accepting HTTP connections on http://localhost:5160
Accepting HTTPS connections on https://localhost:7160
```

4. **Verify API is running**
- Open browser to: `https://localhost:7160/swagger`
- You should see Swagger UI

### Step 4: Frontend Setup

1. **Open a new PowerShell window** (keep backend running in original)

2. **Navigate to frontend folder**
```powershell
cd d:\billsystem\frontend
```

3. **Install dependencies**
```powershell
npm install
```

4. **Create .env file**
```powershell
# Windows PowerShell
@"
REACT_APP_API_URL=https://localhost:7160/api
"@ | Out-File -FilePath .env -Encoding utf8
```

5. **Start React development server**
```powershell
npm start
```

Expected output:
```
Compiled successfully!
You can now view bill-generator-frontend in the browser.
Local:            http://localhost:3000
```

6. **Browser should automatically open**
- If not, navigate to: `http://localhost:3000`

### Step 5: Verify Everything is Working

1. **Confirm Backend is Running**
   - Check PowerShell window shows startup messages
   - Visit `https://localhost:7160/swagger`

2. **Confirm Frontend is Running**
   - Check second PowerShell window shows compilation messages
   - Browser shows the bill generator app

3. **Test Basic Functionality**
   - Navigate to "Create Bill"
   - Select an item from "Entrance" catalog
   - Add quantity and click "Add"
   - Click "Save Bill"
   - Check that bill appears in history

## Key Files Location

- Frontend Code: `d:\billsystem\frontend\src\`
- Backend Code: `d:\billsystem\backend\BillGeneratorAPI\`
- Frontend Styles: `d:\billsystem\frontend\src\styles\`
- Backend Models: `d:\billsystem\backend\BillGeneratorAPI\Models\`

## Database Connection String

The default connection string in `appsettings.json`:
```
Server=(localdb)\mssqllocaldb;Database=BillGeneratorDb;Trusted_Connection=true;
```

To use a different SQL Server:
```
Server=YOUR_SERVER_NAME;Database=BillGeneratorDb;Trusted_Connection=true;
```

## Port Configuration

- **Frontend**: http://localhost:3000
- **Backend API**: https://localhost:7160 (HTTPS)
- **Backend HTTP**: http://localhost:5160
- **Swagger Docs**: https://localhost:7160/swagger

## Common Issues & Solutions

### Issue: "npm: The term 'npm' is not recognized"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: ".NET SDK not found"
**Solution**: Install .NET 6.0 from https://dotnet.microsoft.com/

### Issue: "Cannot connect to HTTPS localhost"
**Solution**: Accept the self-signed certificate warning in browser

### Issue: "CORS error in browser console"
**Solution**: 
- Ensure backend is running on https://localhost:7160
- Check .env file has correct API_URL

### Issue: "Database connection failed"
**Solution**:
- Verify SQL Server Express is running
- Check connection string in appsettings.json
- Run migrations: `dotnet ef database update`

### Issue: "Port 3000 already in use"
**Solution**:
```powershell
# Find process using port 3000
netstat -ano | findstr :3000
# Kill process (replace PID)
taskkill /PID your_pid /F
```

## Development Workflow

### Make Frontend Changes
1. Edit files in `d:\billsystem\frontend\src\`
2. React hot-reload will automatically update browser

### Make Backend Changes
1. Edit files in `d:\billsystem\backend\BillGeneratorAPI\`
2. Rebuild and restart: `dotnet run`

### Add New Database Fields
1. Edit Model in `Models\Bill.cs`
2. Create migration: `dotnet ef migrations add MigrationName`
3. Update database: `dotnet ef database update`

## Production Deployment Checklist

- [ ] Set CORS origins to specific domains
- [ ] Implement user authentication
- [ ] Use environment-specific configuration
- [ ] Enable HTTPS certificates
- [ ] Set up automated backups
- [ ] Configure logging for production
- [ ] Performance test with large datasets
- [ ] Security audit of API endpoints

## Useful Commands Summary

```powershell
# Frontend
cd d:\billsystem\frontend
npm install          # Install dependencies
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests

# Backend
cd d:\billsystem\backend\BillGeneratorAPI
dotnet restore       # Restore NuGet packages
dotnet build         # Build project
dotnet run           # Run project
dotnet ef migrations add MigrationName  # Create migration
dotnet ef database update               # Apply migrations
```

## Next Steps After Setup

1. **Explore the Dashboard**: View statistics and top items
2. **Create a Test Bill**: Familiarize with the UI
3. **Export a Bill as PDF**: Test export functionality
4. **Manage Catalogs**: Add custom items
5. **Review Historic Transactions**: Check bill history

## Support Resources

- .NET Documentation: https://docs.microsoft.com/dotnet/
- React Documentation: https://react.dev/
- Entity Framework: https://docs.microsoft.com/ef/
- SQL Server Express: https://www.microsoft.com/sql-server/sql-server-express

---

**Last Updated**: 2024
**Windows Version**: Windows 10/11
**Tested With**: .NET 6.0, Node.js 16+, SQL Server Express 2019+
