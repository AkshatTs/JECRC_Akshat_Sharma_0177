# 🐳 DOCKER COMMANDS & TROUBLESHOOTING
## Logistics & Supply Chain Tracking System

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

### View All Logs
```bash
docker-compose logs -f
```

### Stop Everything
```bash
docker-compose down
```

### Full Reset (Delete all data)
```bash
docker-compose down -v
```

---

## 🔍 SERVICE-SPECIFIC COMMANDS

### PostgreSQL Database

**View logs:**
```bash
docker-compose logs -f logitrack_postgres
```

**Connect to database:**
```bash
docker exec -it logitrack_postgres psql -U postgres -d LogiTrackDb
```

**List all tables:**
```bash
docker exec logitrack_postgres psql -U postgres -d LogiTrackDb -c "\dt"
```

**Backup database:**
```bash
docker exec logitrack_postgres pg_dump -U postgres LogiTrackDb > logitrack_backup.sql
```

**Restore database:**
```bash
docker exec -i logitrack_postgres psql -U postgres LogiTrackDb < logitrack_backup.sql
```

---

### Zookeeper

**View logs:**
```bash
docker-compose logs -f logitrack_zookeeper
```

**Check Zookeeper health:**
```bash
docker exec logitrack_zookeeper echo stat | nc localhost 2181
```

**Zookeeper CLI commands:**
```bash
docker exec -it logitrack_zookeeper zkCli.sh -server localhost:2181
```

---

### Kafka Message Queue

**View logs:**
```bash
docker-compose logs -f logitrack_kafka
```

**List all topics:**
```bash
docker exec logitrack_kafka /opt/kafka/bin/kafka-topics.sh \
  --list \
  --bootstrap-server localhost:9092
```

**Create a new topic:**
```bash
docker exec logitrack_kafka /opt/kafka/bin/kafka-topics.sh \
  --create \
  --bootstrap-server localhost:9092 \
  --topic my-topic \
  --partitions 1 \
  --replication-factor 1
```

**Describe a topic:**
```bash
docker exec logitrack_kafka /opt/kafka/bin/kafka-topics.sh \
  --describe \
  --bootstrap-server localhost:9092 \
  --topic my-topic
```

**Monitor topic messages:**
```bash
docker exec logitrack_kafka /opt/kafka/bin/kafka-console-consumer.sh \
  --bootstrap-server localhost:9092 \
  --topic my-topic \
  --from-beginning
```

**Delete a topic:**
```bash
docker exec logitrack_kafka /opt/kafka/bin/kafka-topics.sh \
  --delete \
  --bootstrap-server localhost:9092 \
  --topic my-topic
```

**Check broker info:**
```bash
docker exec logitrack_kafka /opt/kafka/bin/kafka-broker-api-versions.sh \
  --bootstrap-server localhost:9092
```

---

### ASP.NET Core API

**View logs:**
```bash
docker-compose logs -f logitrack_api
```

**Access container shell:**
```bash
docker exec -it logitrack_api /bin/sh
```

**Check running processes:**
```bash
docker top logitrack_api
```

**View Swagger documentation:**
```
http://localhost:5000/swagger
```

**Test API connectivity:**
```bash
docker exec logitrack_api curl -i http://localhost:8080/api/shipments
```

---

### Angular Frontend

**View logs:**
```bash
docker-compose logs -f logitrack_frontend
```

**Access container shell:**
```bash
docker exec -it logitrack_frontend /bin/sh
```

**Check served files:**
```bash
docker exec logitrack_frontend ls -la /usr/share/nginx/html/
```

**Verify nginx configuration:**
```bash
docker exec logitrack_frontend cat /etc/nginx/conf.d/default.conf
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
docker inspect logitrack_api
```

### Network Information
```bash
docker network ls
docker network inspect logitrack-network
```

### Volume Information
```bash
docker volume ls
docker volume inspect logitrack_postgres_data
```

---

## 🔨 REBUILD & RESTART

### Rebuild Specific Service
```bash
# Rebuild API
docker-compose up -d --build logitrack_api

# Rebuild Frontend
docker-compose up -d --build logitrack_frontend

# Rebuild Database
docker-compose up -d --build logitrack_postgres
```

### Restart Services (Keep data)
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart logitrack_api
```

### Stop Services (Keep data)
```bash
# Stop all
docker-compose stop

# Stop specific service
docker-compose stop logitrack_api
```

### Start Stopped Services
```bash
# Start all
docker-compose start

# Start specific service
docker-compose start logitrack_api
```

---

## 🐛 TROUBLESHOOTING

### Issue: Kafka won't start

**Check if Zookeeper is running first:**
```bash
docker-compose ps logitrack_zookeeper
# Must show "Up"
```

**Full logs:**
```bash
docker-compose logs logitrack_kafka
```

**Check network connectivity:**
```bash
docker exec logitrack_kafka curl -i zookeeper:2181
```

**Reset and try again:**
```bash
docker-compose down -v
docker-compose up -d --build
sleep 60  # Wait for all services
```

---

### Issue: PostgreSQL connection fails

**Verify database is healthy:**
```bash
docker-compose ps logitrack_postgres
# Should show "Up (healthy)"
```

**Test connection:**
```bash
docker exec logitrack_postgres psql -U postgres -d LogiTrackDb -c "SELECT 1"
```

**Check database logs:**
```bash
docker-compose logs logitrack_postgres
```

**Verify connection string in API:**
```
Host=postgres;Port=5432;Database=LogiTrackDb;Username=postgres;Password=postgres
```

---

### Issue: API can't connect to Kafka

**Check Kafka is running:**
```bash
docker-compose ps logitrack_kafka
```

**Test connection from API container:**
```bash
docker exec logitrack_api nc -zv kafka 9092
# Should show "succeeded"
```

**Check Kafka broker logs:**
```bash
docker-compose logs logitrack_kafka | grep -i "error\|fail"
```

**Verify Kafka configuration:**
```bash
echo "KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092"
```

---

### Issue: Frontend Won't Load

**Verify nginx is running:**
```bash
docker exec logitrack_frontend ps aux | grep nginx
```

**Check nginx config:**
```bash
docker exec logitrack_frontend cat /etc/nginx/conf.d/default.conf
```

**Verify build succeeded:**
```bash
docker exec logitrack_frontend ls -la /usr/share/nginx/html/dist/
```

**Check nginx error logs:**
```bash
docker exec logitrack_frontend tail -50 /var/log/nginx/error.log
```

---

### Issue: Containers keep restarting

**Check logs for error:**
```bash
docker-compose logs --tail 100 [service-name]
```

**Common causes:**
- Port conflict → Check `netstat -ano`
- Disk space full → Check `docker system df`
- Out of memory → Check `docker stats`
- Dependency not ready → Wait longer, check healthchecks

**Solution:**
```bash
docker-compose down -v
docker-compose up -d --build
docker-compose logs -f  # Monitor closely
```

---

### Issue: Port already in use

**Check what's using the port:**
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
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
api:
  ports:
    - "5001:8080"  # Changed from 5000
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
```

### Remove specific container
```bash
docker rm logitrack_api
```

### Remove specific image
```bash
docker rmi logitrack-frontend:latest
```

---

## 📊 DOCKER COMPOSE BREAKDOWN

### Services
```yaml
services:
  postgres:       # PostgreSQL 16 (database)
  zookeeper:      # Zookeeper (coordinator)
  kafka:          # Apache Kafka (message broker)
  api:            # ASP.NET Core 8 API
  frontend:       # Angular 17 + Nginx
```

### Ports Mapping
| Container | Internal | External | Purpose |
|-----------|----------|----------|---------|
| postgres | 5432 | 5432 | Database connection |
| zookeeper | 2181 | Not exposed | Kafka coordination |
| kafka | 9092 | 9092 | Message queue |
| api | 8080 | 5000 | REST API |
| frontend | 80 | 4200 | Web UI |

### Environment Variables
```bash
# PostgreSQL
POSTGRES_DB=LogiTrackDb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Kafka
KAFKA_BROKER_ID=1
KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092
KAFKA_AUTO_CREATE_TOPICS_ENABLE=true

# API
ASPNETCORE_ENVIRONMENT=Development
ConnectionStrings__DefaultConnection=Host=postgres;Port=5432;Database=LogiTrackDb;Username=postgres;Password=postgres
Kafka__BootstrapServers=kafka:9092
```

---

## 💾 BACKUP & RESTORE

### Backup Database
```bash
docker exec logitrack_postgres pg_dump -U postgres LogiTrackDb | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz
```

### Restore Database
```bash
gunzip < backup_YYYYMMDD_HHMMSS.sql.gz | docker exec -i logitrack_postgres psql -U postgres LogiTrackDb
```

### Backup Volumes
```bash
docker run --rm -v logitrack_postgres_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/volumes_backup.tar.gz -C /data .
```

---

## ✅ HEALTH CHECK COMMANDS

```bash
# All containers running
docker-compose ps

# Database health
docker exec logitrack_postgres psql -U postgres -d LogiTrackDb -c "SELECT 1"

# Kafka health
docker exec logitrack_kafka /opt/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server localhost:9092

# API health
curl http://localhost:5000/swagger

# Frontend health
curl http://localhost:4200/

# Network connectivity
docker network inspect logitrack-default
```

