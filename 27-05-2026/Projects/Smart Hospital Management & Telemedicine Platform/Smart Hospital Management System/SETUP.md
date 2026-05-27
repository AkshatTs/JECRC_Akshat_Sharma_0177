# 🚀 SETUP & QUICK START GUIDE  
## Smart Hospital Management & Telemedicine Platform

---

## 📋 Prerequisites

| Component | Version | Required |
|-----------|---------|----------|
| .NET SDK | 8.0+ | ✅ |
| Node.js | 22+ | ✅ |
| SQL Server | 2022+ | ✅ (Docker handles it) |
| Docker & Docker Compose | Latest | ✅ |
| Git | Latest | ✅ |

---

## ⚡ FASTEST WAY TO START (Docker - Recommended)

```bash
# 1. Navigate to project directory
cd "Smart Hospital Management & Telemedicine Platform/Smart Hospital Management System"

# 2. Start all services from infra/docker directory
docker-compose -f infra/docker/docker-compose.yml up -d --build

# 3. Wait 30 seconds for SQL Server to initialize

# 4. Verify all containers are running
docker-compose -f infra/docker/docker-compose.yml ps

# 5. Access the application
# Frontend:  http://localhost:5173        (React Dev Server)
# API:       http://localhost:5187        (REST API)
```

**Expected Output:**
```
NAME              STATUS      PORTS
sqlserver         Up (healthy) 1433/tcp
hospital-api      Up (healthy) 5187/tcp
hospital-web      Up           5173/tcp
```

---

## 🔧 MANUAL SETUP (Local Development)

### Step 1: SQL Server Setup

**Option A: Docker (Recommended)**
```bash
docker run -d \
  --name hospital-sqlserver \
  -e ACCEPT_EULA=Y \
  -e MSSQL_SA_PASSWORD="Hospital_dev_12345" \
  -p 1433:1433 \
  mcr.microsoft.com/mssql/server:2022-latest
```

**Option B: Local SQL Server Install**
- Download SQL Server Developer Edition
- Create database: `HospitalDb`
- Set connection string in `appsettings.json`

### Step 2: Database Setup

```bash
# Navigate to project
cd "Smart Hospital Management System"

# Create and apply migrations
dotnet ef database update --project src/Hospital.Infrastructure --startup-project src/Hospital.Api

# Or run SQL script
sqlcmd -S localhost -U sa -P Hospital_dev_12345 < infra/sql/init.sql
```

### Step 3: Backend Setup

```bash
cd src/Hospital.Api

# Build and run
dotnet run
# API runs at: http://localhost:5187
```

### Step 4: Frontend Setup

```bash
cd web

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend runs at: http://localhost:5173
```

---

## 📊 Architecture Overview

```
┌────────────────────────────────────────────────────┐
│  React 18 SPA (Port 5173 - Dev Server)            │
│  ├─ Patient Portal                                 │
│  ├─ Doctor Dashboard                               │
│  ├─ Appointment Scheduler                          │
│  ├─ Telemedicine (Video calls)                     │
│  ├─ Lab Reports & Prescriptions                    │
│  └─ Emergency Tracking                             │
└────────────────┬─────────────────────────────────────┘
                 │ HTTP/REST + WebSocket
┌────────────────▼─────────────────────────────────────┐
│  ASP.NET Core 8 API (Port 5187)                      │
│  ├─ Authentication (JWT)                            │
│  ├─ Patient Management                              │
│  ├─ Doctor Management                               │
│  ├─ Appointment Scheduling                          │
│  ├─ Lab Reports & Results                           │
│  ├─ Billing & Payments                              │
│  ├─ SignalR Hub (Real-time notifications)           │
│  └─ Telemedicine Integration                        │
└────────┬─────────────────────────────────┬───────────┘
         │ SQL                             │
         │                                 │
         │                         ┌───────▼────────┐
         │                         │  SignalR Hub   │
         │                         │  Real-time     │
         │                         └────────────────┘
         │
    ┌────▼──────────┐
    │   SQL Server  │
    │   2022        │
    │   Port: 1433  │
    └───────────────┘
```

---

## 🔑 Core Features

| Feature | Technology | Purpose |
|---------|----------|---------|
| Patient Portal | React 18 | Self-service access |
| Doctor Dashboard | React + Charts | Medical management |
| Appointments | ASP.NET Core | Scheduling with conflict prevention |
| Telemedicine | WebRTC + SignalR | Video consultations |
| Real-time Updates | SignalR | Instant notifications |
| Emergency Tracking | React + Maps | Emergency dispatch |
| Role-Based Access | JWT + Claims | Security |

---

## 📁 Project Structure

```
Smart Hospital Management System/
├── src/
│   ├── Hospital.Api/         # Controllers, Startup, Program.cs
│   ├── Hospital.Application/ # Services, DTOs, Business Logic
│   ├── Hospital.Core/        # Domain Entities, Enums
│   ├── Hospital.Infrastructure/ # Data access, SignalR
│   └── Hospital.Domain/      # Domain models
├── web/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── hooks/            # Custom hooks
│   │   ├── context/          # React Context
│   │   └── styles/           # CSS/Tailwind
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
├── infra/
│   ├── docker/
│   │   └── docker-compose.yml
│   └── sql/
│       └── init.sql
└── HospitalPlatform.slnx
```

---

## 🔐 Credentials & Configuration

### SQL Server
```
Host: sqlserver (Docker) or localhost
Port: 1433
Username: sa
Password: Hospital_dev_12345
Database: HospitalDb
```

### Demo Accounts
```
Admin:    admin@hospital.local / Admin@123
Doctor:   doctor@hospital.local / Doctor@123
Patient:  patient@hospital.local / Patient@123
```

### API Configuration
```
ASPNETCORE_URLS: http://+:5187
Auth__SigningKey: replace-this-with-a-long-local-development-secret
Database: HospitalDb
```

---

## 🎯 Common Development Tasks

### Generate New Model & DbSet
```bash
cd src/Hospital.Infrastructure

# Add DbSet in AppDbContext.cs
# Create migration
dotnet ef migrations add AddNewModel -s ../Hospital.Api

# Apply migration
dotnet ef database update -s ../Hospital.Api
```

### Create New React Component
```bash
cd web

# Manual approach
# 1. Create folder: src/components/YourComponent
# 2. Create: YourComponent.tsx
# 3. Create: YourComponent.module.css (optional)
# 4. Export from index.ts
```

### Add New API Endpoint
```bash
# 1. Create Controller: src/Hospital.Api/Controllers/YourController.cs
# 2. Implement service in Application layer
# 3. Test with Swagger at http://localhost:5187/swagger
```

### Run Tests (if created)
```bash
cd src
dotnet test
```

---

## 🚨 Key API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/Auth/Login` | User authentication |
| GET | `/api/Patients` | List patients |
| GET | `/api/Doctors` | List doctors |
| POST | `/api/Appointments` | Schedule appointment |
| GET | `/api/Appointments/{id}` | Get appointment details |
| POST | `/api/LabReports` | Submit lab report |
| GET | `/api/Emergency` | Emergency cases |
| GET | `/swagger` | API documentation |
| WS | `/hubs/notifications` | SignalR real-time hub |

---

## ✅ Verification Checklist

After starting the application:

- [ ] All 3 containers running (`docker-compose ps`)
- [ ] SQL Server is healthy (can execute queries)
- [ ] API running at `http://localhost:5187`
- [ ] Frontend at `http://localhost:5173`
- [ ] Can login with demo accounts
- [ ] Can view and create appointments
- [ ] Real-time notifications working
- [ ] No JavaScript errors in browser console

---

## 🐛 Common Issues

### Issue: SQL Server won't start
```bash
# Check if port 1433 is available
netstat -ano | findstr :1433

# View SQL Server logs
docker-compose -f infra/docker/docker-compose.yml logs -f sqlserver
```

### Issue: API can't connect to database
```bash
# Test SQL connection
docker exec hospital-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Hospital_dev_12345 -Q "SELECT 1"

# Check connection string in appsettings.json
```

### Issue: Frontend can't reach API
```bash
# Verify API is running on 5187
netstat -ano | findstr :5187

# Check CORS configuration in API (Program.cs)
# Should allow http://localhost:5173

# Clear browser cache
# Hard refresh: Ctrl+Shift+R
```

### Issue: Authentication fails
```bash
# Check Auth__SigningKey is set
# Verify JWT token is being sent in Authorization header
# Check user roles are assigned correctly in database
```

---

## 📊 Database Schema

Key entities:
- `Users` - Authentication & Authorization
- `Patients` - Patient information
- `Doctors` - Doctor profiles & specializations
- `Appointments` - Appointment scheduling
- `LabReports` - Lab test results
- `Prescriptions` - Doctor prescriptions
- `Billing` - Payment & billing records
- `Emergency` - Emergency cases

---

## 🚀 Production Deployment

### Before deploying:
1. Change database password from default
2. Update JWT signing key
3. Configure HTTPS
4. Set appropriate CORS origins
5. Enable database backups
6. Configure logging & monitoring
7. Set environment variables

### Deploy steps:
```bash
# Build API
dotnet publish -c Release

# Build React for production
cd web && npm run build
```

---

## 📞 Support

- **API Swagger**: `http://localhost:5187/swagger`
- **Database**: Use SSMS or Azure Data Studio
- **React DevTools**: Browser extension for debugging
- **SignalR Hub**: WebSocket connection at `/hubs/notifications`

---

## 🎯 Next Steps

1. **User Management** - Add role-based permissions
2. **Payment Gateway** - Integrate payment provider
3. **SMS Notifications** - Add SMS alerts
4. **Email Service** - Send email confirmations
5. **Analytics** - Add dashboards and reports
6. **Mobile App** - Develop React Native version

