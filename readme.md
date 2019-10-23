##Brief 

Currency rate/converter application, provides
REST API to interact with currency/rate common operations.

###Initial task reference
[Currency Rates/Converter  ](https://github.com/rmustafaiev/currency-exchange/blob/master/task.md)

###Application spec
[Application spec  ](https://github.com/rmustafaiev/currency-exchange/blob/master/doc/spec.md)

###Install notes

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

**Migrate Db**
Please head to `projetc/migration`
Run / sh migration.sh
This will create initial Db

**NodeJS**

Following steps describe installation procedure.
Please head to your project dir.'

Clone the project 
>https://github.com/rmustafaiev/currency-exchange.git
>
Run 
>npm i

Please make file `.env` file in the root directory
and follow `envexample` file to full fill config options.

**DB migration.**

Db migration scripts detached due initial Db setup steps
So after Db has been in touch, please follow next steps,
Run migration scripts
> npm run migration

