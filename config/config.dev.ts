import { Config } from "./typings";

const POSTGRES_USER = "aboutdevs";
const POSTGRES_PASSWORD = "aboutdevs";
const POSTGRES_DATABASE = "aboutdevs";
const POSTGRES_HOST = "localhost";
const POSTGRES_PORT = 5432;

const config: Config = {
    db: {
        connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`,
        massiveConnectionObject: {
            host: POSTGRES_HOST,
            port: POSTGRES_PORT,
            database: POSTGRES_DATABASE,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
        },
    },
};

export default config;
