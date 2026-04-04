# API Service Configuration Guide

## Database Connection Strings

### Using SQL Server Express (Default)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=BillGeneratorDb;Trusted_Connection=true;"
  }
}
```

### Using Local SQL Server Instance
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.\\SQLEXPRESS;Database=BillGeneratorDb;Trusted_Connection=true;"
  }
}
```

### Using Remote SQL Server
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=your_server_ip;Database=BillGeneratorDb;User Id=sa;Password=your_password;"
  }
}
```

### Using Azure SQL Database
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:your_server.database.windows.net,1433;Initial Catalog=BillGeneratorDb;Persist Security Info=False;User ID=your_user;Password=your_password;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }
}
```

## Frontend Environment Variables

### Development
```
REACT_APP_API_URL=https://localhost:7160/api
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

### Production
```
REACT_APP_API_URL=https://yourdomain.com/api
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

## API Endpoints Reference

### Base URL
```
https://localhost:7160/api
```

### Bill Endpoints
- `GET /bills` - List all bills
- `POST /bills` - Create new bill
- `GET /bills/{id}` - Get bill details
- `PUT /bills/{id}` - Update bill
- `DELETE /bills/{id}` - Delete bill
- `GET /bills/search/{invoiceNumber}` - Search bills
- `GET /bills/date-range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Filter by date
- `GET /bills/daily-report/{date}` - Get daily sales report
- `POST /bills/draft` - Save draft bill
- `GET /bills/drafts/all` - Get all drafts
- `DELETE /bills/draft/{id}` - Delete draft

### Catalog Endpoints
- `GET /catalogs` - List all catalog items
- `POST /catalogs` - Create new catalog item
- `GET /catalogs/{id}` - Get catalog item
- `PUT /catalogs/{id}` - Update catalog item
- `DELETE /catalogs/{id}` - Delete catalog item
- `GET /catalogs/type/{catalogType}` - Get items by type (entrance, donation, selling)

## Logging Configuration

### Development (appsettings.Development.json)
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  }
}
```

### Production (appsettings.json)
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft": "Warning"
    }
  }
}
```

## CORS Configuration

### Current (Development)
```csharp
options.AddPolicy("AllowReactApp", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});
```

### Production Example
```csharp
options.AddPolicy("AllowReactApp", builder =>
{
    builder.WithOrigins("https://yourdomain.com")
           .AllowAnyMethod()
           .AllowAnyHeader();
});
```

## Port Configuration

### Current Ports
- React Frontend: `http://localhost:3000`
- .NET API HTTP: `http://localhost:5160`
- .NET API HTTPS: `https://localhost:7160`

### To Change Ports in Program.cs
```csharp
var app = builder.Build();
app.LocalhostUrl = "https://localhost:YOUR_PORT";
app.Run();
```

## Email Configuration (for future notifications)

Add to appsettings.json:
```json
{
  "EmailSettings": {
    "SmtpServer": "smtp.gmail.com",
    "SmtpPort": 587,
    "SenderEmail": "your-email@gmail.com",
    "SenderPassword": "your-app-password",
    "EnableSSL": true
  }
}
```

## Authentication Configuration (for future implementation)

Add to appsettings.json:
```json
{
  "Jwt": {
    "SecretKey": "your-super-secret-key-here",
    "Issuer": "BillGeneratorAPI",
    "Audience": "BillGeneratorClient",
    "ExpirationMinutes": 60
  }
}
```

## Application Insights (for monitoring)

Add to appsettings.json:
```json
{
  "ApplicationInsights": {
    "InstrumentationKey": "your-instrumentation-key"
  }
}
```

---

**Last Updated**: 2024
