"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const massive = require("massive");
const config_1 = require("../../../config/config");
let db;
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        if (db)
            return db;
        db = massive(config_1.default.db.massiveConnectionObject);
        return db;
    });
}
exports.default = default_1;
//# sourceMappingURL=buildDb.js.map