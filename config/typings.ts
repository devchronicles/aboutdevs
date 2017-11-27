import * as massive from "massive";

export interface GoogleApiConfig {
    geocodeApiKey: string;
}

export interface StackOverflowApiConfig {
    key: string;
}

export interface DbConfig {
    connectionString: string;
    massiveConnectionObject: massive.ConnectionInfo;
}

export interface Config {
    google?: GoogleApiConfig;
    stackoverflow?: StackOverflowApiConfig;
    db?: DbConfig;
}
