#Brief 

###Initial task reference

###Application spec

Prerequisites:
>PostgreSQL should be provided if already installed,
 otherwise it run in docker
 

**DOCKER**
**Compose**
>`docker-compose up -d`

**Check**
>`docker logs -f postgresdb` 

**Check Db**
>`docker exec -it postgres-db  psql -U postgres -q`

**Create Db**
>`docker exec -it postgresdb psql -U postgres -c "CREATE DATABASE currency_exchange" -q`

**RM**`docker run  -it --rm postgresdb psql -U postgres -q`

