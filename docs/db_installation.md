# Local Database installation instructions

- Install Postgres. At least on Windows (not sure about other OSs), Postgres is distributed through
  either BigSQL and EnterpriseDB. Apparently EnterpriseDB used to be the one listed in the Postgres
  download page, but not it's BigSQL. AboutDev currently uses Postgres 9.6.6.
- Install the PostGIS extension for spacial search. If you're using EnterpriseDB, PostGIS can be
  installed through the Stackbuilder GUI, that ships with the EnterpriseDB installer. If you're using BigSQL,
  PostGIS can be installed through `psc` (PrettyGoodCommandLine). The `psc` 
- Make sure that `[whavever]/Postgres/bin` is in PATH. All built-in DB commands on AboutDevs will consider 
  the Postgres CLI commands will be available. If your using BigSQL, make sure that 
 `[whatever]/Postgres` is in PATH too, because that's where `psc` lies. The `psc` command for installing PostGIS
  is `pgc install postgis23-pg96`
- Start `PgAdmin`, `DataGrip` or whatever DB management tool you prefer using the `postgres` admin user and
  create the `aboutdevs` role. All built-in DB commands on AboutDevs will consider this role exists.


    CREATE ROLE aboutdevs
        WITH
        LOGIN
        SUPERUSER
        PASSWORD 'aboutdevs'
        
Now, all NPM commands for DB manipulation, listed in the `package.json` files 
should work. These are the `db:*` commands (refer to `package.json -> scripts`)
for a list of available commands.

Run `npm run db:install` to get your AboutDevs database set up :)