"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const POSTGRES_USER = "aboutdevs";
const POSTGRES_PASSWORD = "aboutdevs";
const POSTGRES_DATABASE = "aboutdevs_tests";
const POSTGRES_HOST = "localhost";
const POSTGRES_PORT = 5432;
const config = {
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
    google: {
        geocodeApiKey: "AIzaSyAWW8gOlj0-P0iT6ISsL1WFX27tNNPZ7_4",
    },
    stackoverflow: {
        key: "2uK67ob8t)Fv)FN*9ZtLqw((",
    },
};
exports.default = config;
//# sourceMappingURL=config.test.js.map