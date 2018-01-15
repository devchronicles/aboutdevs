"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringHelper = require("../src/common/helpers/stringHelper");
const professions = require('../data/professions-processed.json');
const nameCanonicalMap = {};
const nameCanonicalNormalizedMap = {};
const nameFeminineMap = {};
const nameFeminineNormalizedMap = {};
function normalize(text) {
    if (!text)
        throw Error("Inconsistent text");
    return stringHelper.normalizeForSearch(text, false);
}
professions.data.forEach((profession) => {
    console.log(`Validating profession: ${profession[0]}`);
    // validating name_canonical
    if (profession[0] in nameCanonicalMap) {
        throw Error(`1 - Conflict in ${profession[0]}`);
    }
    else {
        nameCanonicalMap[profession[0]] = true;
    }
    // validating name_canonical_normalized
    if (normalize(profession[0]) in nameCanonicalNormalizedMap) {
        throw Error(`2 - Conflict in ${normalize(profession[0])}`);
    }
    else {
        nameCanonicalNormalizedMap[normalize(profession[0])] = true;
    }
    // validating name_feminine
    if (profession[1] in nameFeminineMap) {
        throw Error(`3 - Conflict in ${profession[1]}`);
    }
    else {
        nameFeminineMap[profession[1]] = true;
    }
    // validating name_canonical
    if (normalize(profession[1]) in nameFeminineNormalizedMap) {
        throw Error(`4 - Conflict in ${profession[1]}`);
    }
    else {
        nameFeminineNormalizedMap[normalize(normalize(profession[1]))] = true;
    }
});
//# sourceMappingURL=validate-professions.js.map