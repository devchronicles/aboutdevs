import { v4 } from 'uuid';
import buildDb from '../src/server/db/buildDb';
import professions from '../data/professions-processed.json';

let promise = Promise.resolve(0);

buildDb()
    .then((db) => {
        professions.data.forEach((profession) => {
            console.log(`Saving profession: ${profession}`);
            promise = promise
                .then(() => db.profession.insert({
                    id: v4(),
                    name_canonical: profession[0],
                    name_feminine: profession[1]
                }));
        });
        promise = promise.then(() => process.exit(0));
    });
