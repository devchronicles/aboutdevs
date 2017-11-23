import {assert} from "chai";
import * as serverTypes from "../../src/server/typings";

/**
 * Asserts it can save, find and delete the given object
 * @param db The Massive instance
 * @param entityName The name of the entity
 * @param originalObject The original object being saved
 */
export function assertCanSaveFindAndDelete(db: serverTypes.AboutDevsDatabase, entityName: string, originalObject: any) {
    // saves the object
    return db[entityName].save(originalObject)
        // tries to find the object we just saved
        .then((obj: any) => db[entityName].findOne(obj.id))
        // asserts everything is there
        .then((obj: any) => {
            for (const property in originalObject) {
                if (originalObject.hasOwnProperty(property)) {
                    assert.strictEqual(obj[property], originalObject[property]);
                }
            }
            return obj;
        })
        // tries to delete the object
        .then((obj: any) => db[entityName].destroy({ id: obj.id }))
        // now tries to find the object again.
        // objs will the the array of objects deleted, in this case, there's only one
        .then((objs: any) => db[entityName].findOne({ id: objs[0].id }))
        .then((obj: any) => assert.isUndefined(obj));
}
