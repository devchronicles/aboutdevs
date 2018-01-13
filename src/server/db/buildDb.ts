import * as massive from "massive";
import config from "../../../config/config";
import * as dbTypes from "../typings/dbTypes";

let db: Promise<dbTypes.AboutDevsDatabase>;

export default async function (): Promise<dbTypes.AboutDevsDatabase> {
    if (db) return db;
    db = massive(config.db.massiveConnectionObject) as Promise<dbTypes.AboutDevsDatabase>;
    return db;
}
