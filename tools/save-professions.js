import buildDb from '../src/server/db/buildDb';
import professions from '../data/professions-processed.json';
import * as searchHelper from '../src/server/helpers/searchHelper';

let promise = Promise.resolve(0);

function normalize(text) {
    if (!text) throw Error('Inconsistent profession');
    return searchHelper.normalize(text, false);
}


buildDb()
    .then((db) => {
        professions.data.forEach((profession) => {
            console.log(`Saving profession: ${profession}`);
            promise = promise
                .then(() => db.profession.insert({
                    name_canonical: profession[0],
                    name_canonical_normalized: normalize(profession[0]),
                    name_feminine: profession[1],
                    name_feminine_normalized: normalize(profession[1])
                }));
        });
        promise = promise.then(() => process.exit(0));
    });
