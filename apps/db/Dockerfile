FROM postgres:17.4

ENV POSTGRES_DB=race_hub_db
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=password

COPY init.sql /docker-entrypoint-initdb.d/
