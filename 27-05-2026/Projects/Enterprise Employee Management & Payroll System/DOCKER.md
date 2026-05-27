# 🐳 DOCKER COMMANDS & TROUBLESHOOTING
## Enterprise Employee Management & Payroll System

---

## ⚡ ESSENTIAL COMMANDS

### Start Everything
```bash
docker-compose up -d --build
```

### Check Status
```bash
docker-compose ps
```

### View Logs (All Services)
```bash
docker-compose logs -f
```

### Stop Everything
```bash
docker-compose down
```

### Full Reset (Delete data)
```bash
docker-compose down -v
```

---

## 🔍 SERVICE-SPECIFIC COMMANDS

### PostgreSQL Database

**View logs:**
```bash
docker-compose logs -f hrms-db
```

**Connect to database:**
```bash
docker exec -it hrms-db psql -U hrms_user -d hrms_db
```

**Run SQL command:**
```bash
docker exec hrms-db psql -U hrms_user -d hrms_db -c "SELECT COUNT(*) FROM Employees;"
```

**Backup database:**
```bash
docker exec hrms-db pg_dump -U hrms_user hrms_db > hrms_backup.sql
```

**Restore database:**
```bash
docker exec -i hrms-db psql -U hrms_user hrms_db < hrms_backup.sql
```

---

### Redis Cache

**View logs:**
```bash
docker-compose logs -f hrms-cache
```

**Connect to Redis CLI:**
```bash
docker exec -it hrms-cache redis-cli
```

**Check cached data:**
```bash
docker exec hrms-cache redis-cli KEYS "*"
```

**Clear all cache:**
```bash
docker exec hrms-cache redis-cli FLUSHALL
```

**Get specific key:**
```bash
docker exec hrms-cache redis-cli GET "key-name"
```

---

### RabbitMQ Message Bus

**View logs:**
```bash
docker-compose logs -f hrms-messaging
```

**Management UI:**
```
http://localhost:15672
Username: guest
Password: guest
```

**Check message queue:**
```bash
docker exec hrms-messaging rabbitmqctl list_queues
```

**Purge a queue:**
```bash
docker exec hrms-messaging rabbitmqctl purge_queue "queue_name"
```

---

### ASP.NET Core API

**View logs:**
```bash
docker-compose logs -f hrms-backend-api
```

**Access container shell:**
```bash
docker exec -it hrms-backend-api /bin/sh
```

**Check running processes:**
```bash
docker top hrms-backend-api
```

**View API on Swagger:**
```
http://localhost:5000/swagger
```

---

### Angular Frontend

**View logs:**
```bash
docker-compose logs -f hrms-frontend-ui
```

**Verify nginx config:**
```bash
docker exec hrms-frontend-ui cat /etc/nginx/conf.d/default.conf
```

**Access container:**
```bash
docker exec -it hrms-frontend-ui /bin/sh
```

**View served files:**
```bash
docker exec hrms-frontend-ui ls -la /usr/share/nginx/html/
```

---

## 📊 MONITORING & STATS

### Real-time Resource Usage
```bash
docker stats
```

### One-time Stats Snapshot
```bash
docker stats --no-stream
```

### Container Details
```bash
docker inspect hrms-backend-api
```

### Network Details
```bash
docker network inspect hrms-network
```

### Volume Information
```bash
docker volume ls
docker volume inspect hrms_postgres_data
```

---

## 🔨 REBUILD & RESTART SCENARIOS

### Rebuild One Service
```bash
# Rebuild API only
docker-compose up -d --build hrms-backend-api

# Rebuild Frontend only
docker-compose up -d --build hrms-frontend-ui

# Rebuild Database only
docker-compose up -d --build hrms-db
```

### Restart Services (Keep data)
```bash
# Restart all
docker-compose restart

# Restart single service
docker-compose restart hrms-backend-api
```

### Stop Services (Keep data)
```bash
# Stop all
docker-compose stop

# Stop single service
docker-compose stop hrms-backend-api
```

### Start Previously Stopped Services
```bash
# Start all
docker-compose start

# Start single service
docker-compose start hrms-backend-api
```

---

## 🐛 TROUBLESHOOTING

### Issue: Containers keep crashing

**Step 1: Check logs**
```bash
docker-compose logs --tail 50 hrms-backend-api
```

**Step 2: Common causes**
- Database not ready → Wait 30 seconds
- Port already in use → Stop conflicting container
- Out of memory → Check Docker resources

**Step 3: Full reset**
```bash
docker-compose down -v
docker-compose up -d --build
```

---

### Issue: Port 5000 already in use

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :5000
kill -9 <PID>
```

**Or change port in docker-compose.yml:**
```yaml
backend:
  ports:
    - "5001:5000"  # Changed from 5000
```

---

### Issue: Database connection fails

**Check if database is healthy:**
```bash
docker-compose ps hrms-db
# Should show: "UP (healthy)"
```

**Test connection manually:**
```bash
docker exec hrms-db psql -U hrms_user -d hrms_db -c "\dt"
```

**Wait for database to be ready:**
```bash
# Docker compose will auto-wait for healthcheck
# But manual wait if needed:
docker-compose logs hrms-db | grep "ready to accept connections"
```

---

### Issue: Angular frontend won't load

**Check if nginx is running:**
```bash
docker exec hrms-frontend-ui ps aux | grep nginx
```

**Check nginx config:**
```bash
docker exec hrms-frontend-ui cat /etc/nginx/conf.d/default.conf
```

**Check if build succeeded:**
```bash
docker exec hrms-frontend-ui ls -la /usr/share/nginx/html/
# Should show index.html and other files
```

**Check nginx logs:**
```bash
docker exec hrms-frontend-ui tail -50 /var/log/nginx/error.log
```

---

### Issue: API can't connect to database

**From API container, test connection:**
```bash
docker exec hrms-backend-api curl -i http://hrms-db:5432
```

**Check network connectivity:**
```bash
docker network inspect hrms-network
# All containers should be connected
```

**Check database credentials:**
```bash
docker exec hrms-db psql -U hrms_user -d hrms_db -c "SELECT 1"
```

---

### Issue: Out of memory / Slow performance

**Check resource limits:**
```bash
docker stats
```

**Increase Docker Desktop memory:**
1. Docker Desktop → Settings → Resources
2. Increase "Memory" allocation
3. Restart Docker

**Or limit specific container:**
```yaml
services:
  hrms-backend-api:
    mem_limit: 1g
    memswap_limit: 1g
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

### Full cleanup (careful!)
```bash
docker system prune -a
# Removes all unsused images, containers, volumes, networks
```

### Remove specific container
```bash
docker rm hrms-backend-api
```

### Remove specific image
```bash
docker rmi hrms-frontend-ui:latest
```

---

## 📝 DOCKER COMPOSE FILE REFERENCE

### Services Overview
```yaml
services:
  db:                  # PostgreSQL 16
  cache:              # Redis 7
  messaging:          # RabbitMQ 3
  backend:            # ASP.NET Core 8 API
  frontend:           # Angular 18 + Nginx

networks:
  hrms-network:       # All services on this network

volumes:
  postgres_data:      # Persistent database storage
  redis_data:         # Persistent cache storage
  rabbitmq_data:      # Persistent message queue storage
```

---

## 🔐 ENVIRONMENT VARIABLES

### Database
```
POSTGRES_DB: hrms_db
POSTGRES_USER: hrms_user
POSTGRES_PASSWORD: hrms_secure_password
```

### Redis
```
No authentication by default
Port: 6379
```

### RabbitMQ
```
Default user: guest
Default password: guest
Management UI: http://localhost:15672
```

### API
```
ASPNETCORE_ENVIRONMENT: Development
ASPNETCORE_URLS: http://+:5000
ConnectionStrings__DefaultConnection: Host=db;Database=hrms_db;Username=hrms_user;Password=hrms_secure_password
Redis__ConnectionString: cache:6379
RabbitMQ__HostName: messaging
JWT__Key: super_secret_key_hrms_platform_1234567890
JWT__Issuer: HRMS_API
JWT__Audience: HRMS_Client
```

---

## 💾 BACKUP & RESTORE

### Full Application Backup
```bash
# 1. Backup database
docker exec hrms-db pg_dump -U hrms_user hrms_db > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Backup volumes
docker run --rm -v hrms_postgres_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/postgres_backup.tar.gz -C /data .

# 3. Save docker-compose.yml for reference
cp docker-compose.yml docker-compose.backup.yml
```

### Full Application Restore
```bash
# 1. Start fresh services
docker-compose down -v
docker-compose up -d

# 2. Wait for database to initialize
sleep 30

# 3. Restore database
docker exec -i hrms-db psql -U hrms_user hrms_db < backup_YYYYMMDD_HHMMSS.sql
```

---

## ✅ HEALTHY STATE CHECKLIST

```bash
# Run all these commands - good output means healthy:

docker-compose ps
# Expected: All containers "Up"

docker-compose logs hrms-db | grep "ready to accept"
# Expected: "database system is ready to accept connections"

curl http://localhost:5000/swagger
# Expected: HTTP 200, Swagger UI loads

curl http://localhost/
# Expected: HTTP 200, Angular app loads

docker exec hrms-cache redis-cli PING
# Expected: PONG

docker exec hrms-messaging rabbitmqctl status
# Expected: No errors

docker exec hrms-db psql -U hrms_user -d hrms_db -c "SELECT 1"
# Expected: 1
```

---

## 📖 USEFUL DOCKER LINKS

- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/docker/)
- [PostgreSQL Docker Official](https://hub.docker.com/_/postgres)
- [Redis Docker Official](https://hub.docker.com/_/redis)
- [RabbitMQ Docker Official](https://hub.docker.com/_/rabbitmq)
- [Nginx Docker Official](https://hub.docker.com/_/nginx)

