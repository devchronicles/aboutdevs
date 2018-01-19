import { Config } from "./typings";

const POSTGRES_USER = process.env.POSTGRES_USER || "aboutdevs";
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "aboutdevs";
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || "aboutdevs";
const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";
const POSTGRES_PORT = (process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : null) || 5432;
const POSTGRES_SSL = process.env.POSTGRES_SSL ? (process.env.POSTGRES_SSL === "true") : (process.env.NODE_ENV === "production");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "AIzaSyAWW8gOlj0-P0iT6ISsL1WFX27tNNPZ7_4";
const STACKOVERFLOW_KEY = process.env.STACKOVERFLOW_KEY || "2uK67ob8t)Fv)FN*9ZtLqw((";

const config: Config = {
    db: {
        connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`,
        massiveConnectionObject: {
            host: POSTGRES_HOST,
            port: POSTGRES_PORT,
            database: POSTGRES_DATABASE,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
            ssl: POSTGRES_SSL,
        },
    },
    google: {
        geocodeApiKey: GOOGLE_API_KEY,
    },
    stackoverflow: {
        key: STACKOVERFLOW_KEY,
    },
};

export default config;
