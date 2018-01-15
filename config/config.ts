import devConfig from "./config.dev";
import prodConfig from "./config.prod";
import testConfig from "./config.test";
import { Config } from "./typings";

let config: Config;
switch (process.env.NODE_ENV) {
    case "development":
        config = devConfig;
        break;
    case "test":
        config = testConfig;
        break;
    default:
        config = prodConfig;
        break;
}
export default config;
