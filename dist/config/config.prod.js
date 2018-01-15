"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const POSTGRES_USER = "u5d920rm4fdp1o";
const POSTGRES_PASSWORD = "p8a89fb693fc4abc90615ea0bbc87643947503e68a264e16aef495434a464ff72";
const POSTGRES_DATABASE = "d68m1ulv3r8dpn";
const POSTGRES_HOST = "ec2-35-168-121-0.compute-1.amazonaws.com";
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
            ssl: true,
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
//# sourceMappingURL=config.prod.js.map