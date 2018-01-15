"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_dev_1 = require("./config.dev");
const config_prod_1 = require("./config.prod");
const config_test_1 = require("./config.test");
let config;
switch (process.env.NODE_ENV) {
    case "development":
        config = config_dev_1.default;
        break;
    case "test":
        config = config_test_1.default;
        break;
    default:
        config = config_prod_1.default;
        break;
}
exports.default = config;
//# sourceMappingURL=config.js.map