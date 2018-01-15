"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
/**
 * Asserts it can save, find and delete the given object
 * @param db The Massive instance
 * @param entityName The name of the entity
 * @param originalObject The original object being saved
 */
function assertCanSaveFindAndDelete(db, entityName, originalObject) {
    // saves the object
    return db[entityName].save(originalObject)
        .then((obj) => db[entityName].findOne(obj.id))
        .then((obj) => {
        for (const property in originalObject) {
            if (originalObject.hasOwnProperty(property)) {
                chai_1.assert.strictEqual(obj[property], originalObject[property]);
            }
        }
        return obj;
    })
        .then((obj) => db[entityName].destroy({ id: obj.id }))
        .then((objs) => db[entityName].findOne({ id: objs[0].id }))
        .then((obj) => chai_1.assert.isNull(obj));
}
exports.assertCanSaveFindAndDelete = assertCanSaveFindAndDelete;
//# sourceMappingURL=dbTestHelper.js.map