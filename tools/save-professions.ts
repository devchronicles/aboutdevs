import buildDb from '../src/server/db/buildDb';
import * as searchHelper from '../src/server/helpers/searchHelper';
const professions = require('../data/professions-processed.json');

let promise = Promise.resolve(0);

function normalize(text: string) {
    if (!text) throw Error('Inconsistent profession');
    return searchHelper.normalize(text, false);
}

buildDb()
    .then((db) => {
        professions.data.forEach((profession: any) => {
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
