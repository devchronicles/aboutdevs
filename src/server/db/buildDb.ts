import * as massive from 'massive';
import config from '../../../config/config';
import * as dbTypes from '../typings/dbTypes';

let db: dbTypes.TazzoDatabase;

export default function() {
    if (db) return Promise.resolve(db);
    return massive(config.db.massiveConnectionObject)
        .then((m) => { db = m as dbTypes.TazzoDatabase; return m as dbTypes.TazzoDatabase; });
}
