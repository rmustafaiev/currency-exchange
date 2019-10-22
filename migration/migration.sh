#!/usr/bin/env sh

# HACK to set env to exec context since docker-machine
#seems to be not visible 'outside' the box/shell
#eval "$(docker-machine env default)"

#connect to shell
#docker exec -it postgresdb psql -U postgres

#ping db
#docker exec -it postgresdb psql -U postgres -c "SELECT NOW()" -q

#drop currency_exchange database
#docker exec -it postgresdb psql -U postgres -c "DROP DATABASE IF EXISTS currency_exchange" -q

#create currency_exchange database
#docker exec -it postgresdb psql -U postgres -c "CREATE DATABASE currency_exchange" -q

#connect currency_exchange
#docker exec -it postgresdb psql -U postgres -d currency_exchange

#import schema
#docker exec -it postgresdb psql -U postgres -d currency_exchange -f "create-schema.sql"

