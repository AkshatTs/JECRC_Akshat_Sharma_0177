# 🚀 SETUP & QUICK START GUIDE
## Logistics & Supply Chain Tracking System

---

## 📋 Prerequisites

| Component | Version | Required |
|-----------|---------|----------|
| .NET SDK | 8.0+ | ✅ |
| Node.js | 20+ | ✅ |
| Angular CLI | 17+ | ✅ |
| PostgreSQL | 16+ | ✅ (Docker handles it) |
| Docker & Docker Compose | Latest | ✅ |
| Kafka | 7.4.0+ | ✅ (Docker handles it) |

---

## ⚡ FASTEST WAY TO START (Docker - Recommended)

```bash
# 1. Navigate to project directory
cd "Logistics & Supply Chain Tracking System"

# 2. Start all services (builds and starts everything)
docker-compose up -d --build

# 3. Wait 30 seconds for services to initialize

# 4. Verify all containers are running
docker-compose ps

# 5. Access the application
# Frontend:  http://localhost:4200          (Angular UI)
# API:       http://localhost:5000          (REST API)
# API Docs:  http://localhost:5000/swagger  (Swagger)
```

**Expected Output:**
```
NAME                STATUS      PORTS
logitrack_postgres  Up           5432/tcp
logitrack_zookeeper Up           2181/tcp
logitrack_kafka     Up           9092/tcp
logitrack_api       Up (healthy) 5000/tcp
logitrack_frontend  Up           4200/tcp
```

---

## 🔧 MANUAL SETUP (Local Development)

### Step 1: Database Setup
```bash
# Option A: Docker (Recommended)
docker run -d \
  --name logitrack-postgres \
  -e POSTGRES_DB=LogiTrackDb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16

# Option B: Local PostgreSQL Install
CREATE DATABASE "LogiTrackDb";
```

### Step 2: Backend Setup
```bash
cd backend

# Restore packages
dotnet restore LogiTrack.sln

# Apply database migrations
cd LogiTrack.API
dotnet ef database update

# Run the API
dotnet run
# API runs at: http://localhost:5000
```

### Step 3: Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
ng serve
# Frontend runs at: http://localhost:4200
```

---

## 📊 Architecture Overview

```
┌──────────────────────────────────────────────────────┐
│  Angular 17 Dashboard (Port 4200)                    │
│  ├─ Shipment tracking                                │
│  ├─ Fleet management (live GPS)                      │
│  ├─ Route optimization                               │
│  ├─ Warehouse inventory                              │
│  └─ Analytics & KPIs                                 │
└────────────────┬─────────────────────────────────────┘
                 │ HTTP/REST + SignalR
┌────────────────▼─────────────────────────────────────┐
│  ASP.NET Core 8 API (Port 5000)                      │
│  ├─ Shipments Management                             │
│  ├─ Fleet Tracking (Real-time GPS)                   │
│  ├─ Warehouse Operations                             │
│  ├─ Route Optimization                               │
│  ├─ SignalR Hub (Live updates)                       │
│  └─ Event Publishing (Kafka)                         │
└────────┬──────────────┬────────────────┬────────────┘
         │ SQL          │ Message Events  │
         │              │                 │
    ┌────▼────┐    ┌────▼───┐    ┌─────▼────┐
    │PostgreSQL│    │Zookeeper│   │  Kafka   │
    │LogiTrackDb    │Port 2181    │Port 9092│
    └──────────┘    └──────────┘  └──────────┘
```

---

## 🔑 Core Features

| Feature | Technology | Purpose |
|---------|----------|---------|
| Real-time Tracking | SignalR + GPS | Live shipment locations |
| Route Optimization | Custom Algorithm | Efficient delivery routes |
| Event Streaming | Kafka | Event-driven updates |
| Database | PostgreSQL | Shipment & fleet data |
| Inventory Mgmt | Angular Components | Warehouse management |
| Analytics | Charts & Reports | KPI visualization |

---

## 📁 Project Structure

```
backend/
├── LogiTrack.API/          # Controllers, Hub, startup
├── LogiTrack.Application/  # Services, DTOs, AutoMapper
├── LogiTrack.Core/         # Domain entities, enums
├── LogiTrack.Infrastructure/ # EF Core, Kafka, SignalR
└── Dockerfile

frontend/
├── src/app/
│   ├── core/               # Models, guards, services
│   ├── layout/             # Shell navigation
│   ├── modules/
│   │   ├── dashboard/      # KPI overview
│   │   ├── shipments/      # Tracking
│   │   ├── fleet/          # GPS visualization
│   │   ├── warehouse/      # Inventory
│   │   ├── routes/         # Optimization
│   │   ├── analytics/      # Reports
│   │   └── customers/      # Customer mgmt
│   └── services/
├── angular.json
└── Dockerfile
```

---

## 🔐 Database Configuration

### Connection String
```
Host: localhost (or 'postgres' in Docker)
Port: 5432
Database: LogiTrackDb
Username: postgres
Password: postgres
```

### Default Databases
```
postgres      - System database
LogiTrackDb   - Application database
```

---

## 🎯 Common Development Tasks

### Generate New Migration
```bash
cd backend
dotnet ef migrations add [MigrationName] -p LogiTrack.Infrastructure -s LogiTrack.API
```

### Update Database
```bash
cd backend/LogiTrack.API
dotnet ef database update
```

### Create Angular Component
```bash
cd frontend
ng generate component modules/shipments/shipment-detail
```

### Run Backend Tests
```bash
cd backend
dotnet test LogiTrack.Tests.csproj
```

### Build Frontend for Production
```bash
cd frontend
npm run build:prod
```

---

## 🚨 Key Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /api/shipments` | List all shipments |
| `GET /api/shipments/{id}` | Shipment details |
| `GET /api/fleet/locations` | Current fleet GPS |
| `GET /api/warehouse/inventory` | Stock levels |
| `GET /api/routes/optimize` | Route recommendations |
| `GET /swagger` | API documentation |
| `/hubs/updates` | SignalR real-time hub |

---

## ✅ Verification Checklist

After starting the application:

- [ ] All 5 containers are running
- [ ] PostgreSQL is accessible
- [ ] Kafka is healthy
- [ ] Frontend loads at `http://localhost:4200`
- [ ] Swagger docs at `http://localhost:5000/swagger`
- [ ] Can view shipments and track GPS locations
- [ ] Real-time updates work (via SignalR)

---

## 🐛 Common Issues

### Issue: Kafka won't start
```bash
# Kafka depends on Zookeeper - check both are running
docker-compose ps | grep -E "kafka|zookeeper"

# View Kafka logs
docker-compose logs -f logitrack_kafka
```

### Issue: Database connection fails
```bash
# Test connection
docker exec -it logitrack_postgres psql -U postgres -d LogiTrackDb -c "SELECT 1"
```

### Issue: API can't connect to Kafka
```bash
# Ensure Kafka is fully started
docker-compose logs logitrack_kafka | grep "started"

# Test from API container
docker exec logitrack_api curl kafka:9092
```

### Issue: Frontend API calls fail
```bash
# Verify API is running
docker-compose logs -f logitrack_api

# Check CORS settings in API
# Should allow localhost:4200
```

---

## 📞 Support

- **API Swagger**: `http://localhost:5000/swagger`
- **Database UI**: Use pgAdmin or DBeaver
- **Kafka UI**: `http://localhost:8080` (if UI container added)
- **Real-time Hub**: WebSocket endpoint at `ws://localhost:5000/hubs/updates`

