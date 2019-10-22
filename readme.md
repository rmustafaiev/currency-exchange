##Brief 

Currency rate/converter application, provides
REST API to interact with currency/rate common operations.

###Initial task reference
[Currency Rates/Converter  ](https://github.com/rmustafaiev/currency-exchange/blob/master/task.md)

###Application spec
[Application spec  ](https://github.com/rmustafaiev/currency-exchange/blob/master/doc/spec.md)


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

**NodeJS**
