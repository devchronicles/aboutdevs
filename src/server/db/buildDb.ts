import * as massive from 'massive';
import config from '../../../config/config';
import * as dbTypes from '../typings/dbTypes';

let db: dbTypes.IIndieJobsDatabase;

export default function () {
    if (db) return Promise.resolve(db);
    return massive(config.db.massiveConnectionObject)
        .then((m) => { db = <dbTypes.IIndieJobsDatabase>m; return <dbTypes.IIndieJobsDatabase>m; });
}
