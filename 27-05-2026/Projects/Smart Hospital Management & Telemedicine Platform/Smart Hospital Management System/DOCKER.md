# 🐳 DOCKER COMMANDS & TROUBLESHOOTING
## Smart Hospital Management & Telemedicine Platform

---

## ⚡ ESSENTIAL COMMANDS

### Start Everything
```bash
# Note: docker-compose.yml is in infra/docker/
docker-compose -f infra/docker/docker-compose.yml up -d --build
```

### Check Status
```bash
docker-compose -f infra/docker/docker-compose.yml ps
```

### View All Logs
```bash
docker-compose -f infra/docker/docker-compose.yml logs -f
```

### Stop Everything
```bash
docker-compose -f infra/docker/docker-compose.yml down
```

### Full Reset (Delete all data)
```bash
docker-compose -f infra/docker/docker-compose.yml down -v
```

---

## 🔍 SERVICE-SPECIFIC COMMANDS

### SQL Server Database

**View logs:**
```bash
docker-compose -f infra/docker/docker-compose.yml logs -f sqlserver
```

**Connect to database using SQLCMD:**
```bash
docker exec -it hospital-sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P Hospital_dev_12345
```

**Execute SQL query:**
```bash
docker exec hospital-sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P Hospital_dev_12345 \
  -Q "SELECT * FROM HospitalDb.dbo.Users"
```

**Backup database:**
```bash
docker exec hospital-sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P Hospital_dev_12345 \
  -Q "BACKUP DATABASE HospitalDb TO DISK = '/var/opt/mssql/backup/HospitalDb.bak'"
```

**Restore database:**
```bash
docker exec hospital-sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P Hospital_dev_12345 \
  -Q "RESTORE DATABASE HospitalDb FROM DISK = '/var/opt/mssql/backup/HospitalDb.bak'"
```

**List all databases:**
```bash
docker exec hospital-sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P Hospital_dev_12345 \
  -Q "SELECT name FROM sys.databases"
```

---

### ASP.NET Core API

**View logs:**
```bash
docker-compose -f infra/docker/docker-compose.yml logs -f hospital-api
```

**Access container shell:**
```bash
docker exec -it hospital-api /bin/sh
```

**Check running processes:**
```bash
docker top hospital-api
```

**View Swagger API documentation:**
```
http://localhost:5187/swagger
```

**Test API endpoint:**
```bash
docker exec hospital-api curl -i http://localhost:8080/api/patients
```

**Check environment variables in container:**
```bash
docker exec hospital-api env | grep -E "ASPNETCORE|Auth__"
```

---

### React Frontend

**View logs:**
```bash
docker-compose -f infra/docker/docker-compose.yml logs -f hospital-web
```

**Access container shell:**
```bash
docker exec -it hospital-web /bin/sh
```

**Check served files:**
```bash
docker exec hospital-web ls -la /usr/share/nginx/html/
```

**Verify nginx configuration:**
```bash
docker exec hospital-web cat /etc/nginx/conf.d/default.conf
```

**Check nginx logs:**
```bash
docker exec hospital-web tail -50 /var/log/nginx/error.log
docker exec hospital-web tail -50 /var/log/nginx/access.log
```

---

## 📊 MONITORING & STATS

### Real-time Resource Usage
```bash
docker stats
```

### One-time Snapshot
```bash
docker stats --no-stream
```

### Container Details
```bash
docker inspect hospital-api
docker inspect hospital-sqlserver
docker inspect hospital-web
```

### Network Information
```bash
docker network ls
docker network inspect hospital-api_default
```

### Volume Information
```bash
docker volume ls
docker volume inspect hospital-sqlserver_sql_data
```

---

## 🔨 REBUILD & RESTART

### Rebuild Specific Service
```bash
# Rebuild API
docker-compose -f infra/docker/docker-compose.yml up -d --build hospital-api

# Rebuild Frontend
docker-compose -f infra/docker/docker-compose.yml up -d --build hospital-web

# Rebuild SQL Server
docker-compose -f infra/docker/docker-compose.yml up -d --build sqlserver
```

### Restart Services (Keep data)
```bash
# Restart all
docker-compose -f infra/docker/docker-compose.yml restart

# Restart specific service
docker-compose -f infra/docker/docker-compose.yml restart hospital-api
```

### Stop Services (Keep data)
```bash
# Stop all
docker-compose -f infra/docker/docker-compose.yml stop

# Stop specific service
docker-compose -f infra/docker/docker-compose.yml stop hospital-api
```

### Start Stopped Services
```bash
# Start all
docker-compose -f infra/docker/docker-compose.yml start

# Start specific service
docker-compose -f infra/docker/docker-compose.yml start hospital-api
```

---

## 🐛 TROUBLESHOOTING

### Issue: SQL Server won't start or keeps restarting

**Check logs:**
```bash
docker-compose -f infra/docker/docker-compose.yml logs sqlserver | tail -100
```

**Common issues:**
- EULA not accepted → Verify `ACCEPT_EULA: "Y"` in docker-compose.yml
- Password too weak → Must be 8+ chars, uppercase, number, special char
- Port in use → Check if 1433 is available

**Solution:**
```bash
docker-compose -f infra/docker/docker-compose.yml down -v sql_data
docker-compose -f infra/docker/docker-compose.yml up -d --build sqlserver
sleep 30  # Wait for SQL to fully initialize
```

---

### Issue: API can't connect to SQL Server

**Test connection from API container:**
```bash
docker exec hospital-api curl -i http://sqlserver:1433
```

**Check connection string:**
```bash
docker exec hospital-api env | grep -i connection
```

**Should be:**
```
Server=sqlserver;Database=HospitalDb;User Id=sa;Password=Hospital_dev_12345;TrustServerCertificate=true;
```

**Verify SQL is accepting connections:**
```bash
docker exec hospital-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Hospital_dev_12345 -Q "SELECT 1"
# Should return: 1
```

---

### Issue: Frontend can't reach API

**Check API is running:**
```bash
docker-compose -f infra/docker/docker-compose.yml ps hospital-api
# Should show as "Up"
```

**Test API from frontend container:**
```bash
docker exec hospital-web curl -i http://hospital-api:8080/api/patients
```

**Check CORS settings in API:**
```bash
# Edit src/Hospital.Api/Program.cs
# Verify CORS allows frontend origin
```

**Test from host machine:**
```bash
curl -i http://localhost:5187/api/patients
```

---

### Issue: Port already in use

**Check what's using port 5187:**
```bash
# Windows
netstat -ano | findstr :5187

# Mac/Linux
lsof -i :5187
```

**Kill the process:**
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

**Or change port in docker-compose.yml:**
```yaml
hospital-api:
  ports:
    - "5190:8080"  # Changed from 5187
```

---

### Issue: Frontend shows blank page

**Check nginx error:**
```bash
docker exec hospital-web tail -50 /var/log/nginx/error.log
```

**Verify React build succeeded:**
```bash
docker exec hospital-web ls -la /usr/share/nginx/html/dist/
# Should show bundled files
```

**Check nginx is serving files:**
```bash
docker exec hospital-web curl http://localhost/
# Should show HTML content
```

**Rebuild frontend:**
```bash
docker-compose -f infra/docker/docker-compose.yml down hospital-web
docker-compose -f infra/docker/docker-compose.yml up -d --build hospital-web
```

---

### Issue: Containers keep restarting

**Check logs for errors:**
```bash
docker-compose -f infra/docker/docker-compose.yml logs --tail 100
```

**Common causes:**
- Dependencies not ready (SQL Server startup time)
- Environment variable issues
- Port conflicts
- Insufficient disk/memory

**Solution:**
```bash
# Full reset with wait
docker-compose -f infra/docker/docker-compose.yml down -v
docker-compose -f infra/docker/docker-compose.yml up -d --build
sleep 60  # Wait for all services
docker-compose -f infra/docker/docker-compose.yml ps
```

---

## 🧹 CLEANUP COMMANDS

### Remove stopped containers
```bash
docker container prune
```

### Remove unused images
```bash
docker image prune
```

### Remove unused volumes
```bash
docker volume prune
```

### Full system cleanup
```bash
docker system prune -a
# Removes all unsused images, containers, volumes, networks
```

### Remove specific items
```bash
docker rm hospital-api                    # Container
docker rmi hospital-api:latest            # Image
docker volume rm sql_data                # Volume
```

---

## 📋 DOCKER COMPOSE FILE REFERENCE

### Services in infra/docker/docker-compose.yml

```yaml
services:
  sqlserver:      # SQL Server 2022
  hospital-api:   # ASP.NET Core 8 API
  hospital-web:   # React + Nginx

volumes:
  sql_data:       # SQL Server data persistence
```

### Port Mapping

| Service | Internal | External | Purpose |
|---------|----------|----------|---------|
| sqlserver | 1433 | 1433 | Database |
| hospital-api | 8080 | 5187 | REST API |
| hospital-web | 80 | 5173 | Web UI |

### Environment Variables

```yaml
# SQL Server
ACCEPT_EULA: "Y"
MSSQL_SA_PASSWORD: "Hospital_dev_12345"

# API
ASPNETCORE_URLS: http://+:8080
Auth__SigningKey: replace-this-with-a-long-local-development-secret

# Frontend (built into image, no runtime env)
```

---

## 💾 BACKUP & RESTORE

### Backup SQL Server Database
```bash
docker exec hospital-sqlserver mkdir -p /var/opt/mssql/backup

docker exec hospital-sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P Hospital_dev_12345 \
  -Q "BACKUP DATABASE HospitalDb TO DISK = '/var/opt/mssql/backup/HospitalDb_$(date +%Y%m%d_%H%M%S).bak'"
```

### Copy Backup from Container
```bash
docker cp hospital-sqlserver:/var/opt/mssql/backup/HospitalDb_*.bak ./backups/
```

### Restore from Backup
```bash
docker cp ./backups/HospitalDb_20260528_120000.bak hospital-sqlserver:/var/opt/mssql/backup/

docker exec hospital-sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P Hospital_dev_12345 \
  -Q "RESTORE DATABASE HospitalDb FROM DISK = '/var/opt/mssql/backup/HospitalDb_20260528_120000.bak'"
```

---

## ✅ HEALTH CHECK COMMANDS

```bash
# All containers running
docker-compose -f infra/docker/docker-compose.yml ps

# SQL Server is healthy
docker exec hospital-sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P Hospital_dev_12345 -Q "SELECT 1"

# API is responding
curl http://localhost:5187/swagger

# Frontend is serving
curl http://localhost:5173/

# Network is good
docker network inspect hospital-api_default
```

---

## 🔧 ADVANCED TIPS

### Monitor in Real-time
```bash
watch -n 1 'docker-compose -f infra/docker/docker-compose.yml ps'
```

### Execute SQL in Docker
```bash
docker exec -i hospital-sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P Hospital_dev_12345 \
  -i ./infra/sql/init-script.sql
```

### Copy Files to/from Container
```bash
# To container
docker cp ./local-file hospital-sqlserver:/var/opt/mssql/

# From container
docker cp hospital-sqlserver:/var/opt/mssql/file.bak ./
```

### Change Docker-Compose File Location for All Commands
```bash
export COMPOSE_FILE=infra/docker/docker-compose.yml

# Then use without -f flag
docker-compose up -d --build
docker-compose ps
```

