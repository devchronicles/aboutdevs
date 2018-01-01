import * as massive from "massive";
import config from "../../../config/config";
import * as dbTypes from "../typings/dbTypes";

let db: dbTypes.AboutDevsDatabase;

export default async function (): Promise<dbTypes.AboutDevsDatabase> {
    if (db) return Promise.resolve(db);
    const m = await massive(config.db.massiveConnectionObject);
    db = m as dbTypes.AboutDevsDatabase;
    return m as dbTypes.AboutDevsDatabase;
}
