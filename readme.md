
RUN DOCKER

docker logs -f postgresdb 
docker exec -it postgres-db  psql -U postgres

docker run  -it --rm postgresdb psql -U postgres

docker exec -it postgresdb psql -U postgres -c "CREATE DATABASE currency_exchange" -q
