import buildDb from '../src/server/db/buildDb';
import * as searchHelper from '../src/common/helpers/stringHelper';

const professions = require('../data/professions-processed.json');

function normalize(text: string) {
    if (!text) throw Error('Inconsistent profession');
    return searchHelper.normalizeForSearch(text, false);
}

buildDb()
    .then( async (db) => {
        for(let i = 0; i < professions.data.length; i++) {
            const profession = professions.data[i];
            console.log(`Saving profession: ${profession}`);
            await db.profession.insert({
                    name_canonical: profession[0],
                    name_canonical_normalized: normalize(profession[0]),
                    name_feminine: profession[1],
                    name_feminine_normalized: normalize(profession[1])
                });
        }
    });
