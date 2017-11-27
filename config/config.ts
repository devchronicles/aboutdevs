import devConfig from "./config.dev";
import devSecretConfig from "./config.dev.secret";
import prodConfig from "./config.prod";
import testConfig from "./config.test";
import { Config } from "./typings";

let config: Config;
switch (process.env.NODE_ENV) {
    case "development":
        config = {...devConfig, ...devSecretConfig};
        break;
    case "test":
        config = {...testConfig, ...devSecretConfig};
        break;
    default:
        config = prodConfig;
        break;
}
export default config;
