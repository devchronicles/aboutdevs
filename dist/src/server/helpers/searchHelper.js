"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertToTsVector(search) {
    if (!search) {
        return "";
    }
    return search.split(" ").join(" & ");
}
exports.convertToTsVector = convertToTsVector;
//# sourceMappingURL=searchHelper.js.map