// configurations for the dev environment
if (process.env.NODE_ENV !== 'test') throw Error('Cannot read test config outside a test environment');

// Postgres settings
const POSTGRES_USER = 'indiejobs';
const POSTGRES_PASSWORD = 'indiejobs';
const POSTGRES_DATABASE = 'indiejobs_tests';
const POSTGRES_HOST = 'localhost';
const POSTGRES_PORT = 5432;

export default {
    google: {
        // you can steal this if you want. It's for development only
        geocodeApiKey: 'AIzaSyAWW8gOlj0-P0iT6ISsL1WFX27tNNPZ7_4'
    },
    db: {
        connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`,
        massiveConnectionObject: {
            host: POSTGRES_HOST,
            port: POSTGRES_PORT,
            database: POSTGRES_DATABASE,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD
        }
    }
};


