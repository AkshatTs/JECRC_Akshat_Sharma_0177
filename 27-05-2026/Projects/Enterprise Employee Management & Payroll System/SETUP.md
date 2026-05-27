# 🚀 SETUP & QUICK START GUIDE
## Enterprise Employee Management & Payroll System

---

## 📋 Prerequisites

| Component | Version | Required |
|-----------|---------|----------|
| .NET SDK | 8.0+ | ✅ |
| Node.js | 20+ | ✅ |
| Angular CLI | 18+ | ✅ |
| PostgreSQL | 16+ | ✅ (Docker handles it) |
| Docker & Docker Compose | Latest | ✅ |
| Git | Latest | ✅ |

---

## ⚡ FASTEST WAY TO START (Docker - Recommended)

```bash
# 1. Navigate to project directory
cd "Enterprise Employee Management & Payroll System"

# 2. Start all services (builds and starts)
docker-compose up -d --build

# 3. Wait 30 seconds for services to initialize

# 4. Verify all containers are healthy
docker-compose ps

# 5. Access the application
# Frontend:  http://localhost/          (Angular UI)
# API Docs:  http://localhost:5000/swagger  (Swagger)
# API:       http://localhost:5000      (Direct API)
```

**Expected Output:**
```
NAME                   UP      HEALTHY    PORTS
hrms-db               Up      Yes        5432/tcp
hrms-cache            Up      N/A        6379/tcp
hrms-messaging        Up      N/A        5672/tcp, 15672/tcp
hrms-backend-api      Up      Yes        5000/tcp
hrms-frontend-ui      Up      N/A        80/tcp
```

---

## 🔧 MANUAL SETUP (Local Development)

### Step 1: Database Setup
```bash
# Option A: Docker (Recommended)
docker run -d \
  --name hrms-postgres \
  -e POSTGRES_DB=hrms_db \
  -e POSTGRES_USER=hrms_user \
  -e POSTGRES_PASSWORD=hrms_secure_password \
  -p 5432:5432 \
  postgres:16-alpine

# Option B: Local PostgreSQL Install
# Create database manually using psql or pgAdmin
CREATE DATABASE hrms_db;
CREATE USER hrms_user WITH PASSWORD 'hrms_secure_password';
ALTER ROLE hrms_user WITH CREATEDB;
```

### Step 2: Backend Setup
```bash
cd backend

# Restore packages
dotnet restore

# Apply database migrations
cd src/HRMS.Infrastructure
dotnet ef database update

# Run the API
cd ../HRMS.API
dotnet run
# API runs at: http://localhost:5000
```

### Step 3: Frontend Setup
```bash
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
ng serve --open
# Frontend runs at: http://localhost:4200
```

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│  Angular 18 SPA (Port 80 - Nginx)                  │
│  ├─ Dashboard, Reports, Admin Console              │
│  └─ Dark-mode Glassmorphic UI                       │
└────────────────┬────────────────────────────────────┘
                 │ HTTP/REST
┌────────────────▼────────────────────────────────────┐
│  ASP.NET Core 8 API (Port 5000)                     │
│  ├─ Auth Controller (JWT)                           │
│  ├─ Employees, Attendance, Leave, Payroll           │
│  ├─ SignalR Hub (Real-time notifications)           │
│  └─ Event Bus (RabbitMQ)                            │
└────────┬─────────────────┬──────────────┬───────────┘
         │ SQL             │ Cache        │ Message
         │                 │              │
    ┌────▼──────┐  ┌──────▼───┐  ┌──────▼──────┐
    │ PostgreSQL │  │  Redis   │  │  RabbitMQ   │
    │ (hrms_db)  │  │ (Cache)  │  │ (Events)    │
    └────────────┘  └──────────┘  └─────────────┘
```

---

## 🔑 Key Features

| Feature | Technology | Purpose |
|---------|----------|---------|
| Multi-Tenancy | Global Query Filters | Data isolation |
| Authentication | JWT Tokens | Secure access |
| Real-time | SignalR | Instant notifications |
| Caching | Redis | Performance optimization |
| Message Bus | RabbitMQ | Event-driven architecture |
| Database | PostgreSQL | Multi-tenant data store |
| UI Framework | Angular 18 | Modern SPA experience |

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── HRMS.Core/          # Domain entities & interfaces
│   ├── HRMS.Application/   # Business logic & DTOs
│   ├── HRMS.Infrastructure/# EF Core, repositories
│   └── HRMS.API/          # Controllers, startup
└── Dockerfile

frontend/
├── src/
│   ├── app/
│   │   ├── core/          # Models, services
│   │   ├── layout/        # Shell component
│   │   └── modules/       # Feature modules
│   ├── assets/
│   └── styles/
├── angular.json
├── package.json
└── Dockerfile
```

---

## 🔐 Credentials & Configuration

### Database
```
Host: db (via Docker network) or localhost (local)
Port: 5432
Username: hrms_user
Password: hrms_secure_password
Database: hrms_db
```

### RabbitMQ Management UI
```
URL: http://localhost:15672
Username: guest
Password: guest
```

### Redis
```
Host: cache:6379 (Docker) or localhost:6379
Database: 0
```

### API JWT Secret
```
Key: super_secret_key_hrms_platform_1234567890
Issuer: HRMS_API
Audience: HRMS_Client
```

---

## 🔧 Common Development Tasks

### Generate New Migration
```bash
cd backend/src/HRMS.API
dotnet ef migrations add MigrationName -p ../HRMS.Infrastructure
```

### Update Database Schema
```bash
cd backend/src/HRMS.API
dotnet ef database update -p ../HRMS.Infrastructure
```

### Add New Angular Component
```bash
cd frontend
ng generate component modules/employees/employee-list
```

### Run Backend Tests
```bash
cd backend
dotnet test
```

### Build Frontend for Production
```bash
cd frontend
ng build --configuration production
```

---

## ✅ Verification Checklist

After starting the application:

- [ ] All 5 containers are running (`docker-compose ps`)
- [ ] PostgreSQL is healthy (can connect via `docker exec`)
- [ ] RabbitMQ is accessible at `http://localhost:15672`
- [ ] Angular frontend loads at `http://localhost/`
- [ ] Swagger API docs load at `http://localhost:5000/swagger`
- [ ] Can authenticate and see employee data
- [ ] Real-time notifications work (check browser console)

---

## 🚨 Troubleshooting

### Containers keep restarting
```bash
# Check API logs
docker-compose logs hrms-backend-api

# Check if database is ready
docker-compose logs hrms-db
```

### Port already in use
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F
```

### Database connection fails
```bash
# Test connection from API container
docker exec hrms-backend-api curl -i http://db:5432

# Or access PostgreSQL directly
docker exec -it hrms-postgres psql -U hrms_user -d hrms_db
```

### Frontend won't load
```bash
# Check nginx config
docker exec hrms-frontend-ui cat /etc/nginx/conf.d/default.conf

# Check nginx logs
docker-compose logs hrms-frontend-ui
```

---

## 📚 Next Steps

1. **User Management** - Create roles and assign permissions
2. **Payroll Configuration** - Set up tax strategies
3. **Custom Reports** - Create department-specific reports
4. **Integration** - Connect to payroll external providers
5. **API Documentation** - Generate OpenAPI/Swagger spec

---

## 💡 Tips & Best Practices

- Always use Docker for development consistency
- Run migrations on startup automatically
- Keep secrets in environment variables, never in code
- Use Redis for frequently accessed data
- Monitor RabbitMQ message queues
- Enable audit logging for compliance

---

## 📞 Support Notes

- **API Documentation**: Navigate to `http://localhost:5000/swagger`
- **Database Client**: Use pgAdmin or DBeaver
- **Message Queue**: Monitor at `http://localhost:15672`
- **Real-time Hub**: SignalR endpoint at `/hubs/notifications`

