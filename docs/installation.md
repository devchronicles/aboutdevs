- Install Postgres
- Install Postgis extension
- Create role indiejobs


    CREATE ROLE indiejobs
        WITH
        LOGIN
        SUPERUSER
        PASSWORD 'indiejobs'