import * as devConfig from './config.dev';
import * as prodConfig from './config.prod';
import * as testConfig from './config.test';

let config: any;
switch (process.env.NODE_ENV) {
    case 'development':
        config = devConfig;
        break;
    case 'test':
        config = testConfig;
        break;
    default:
        config = prodConfig;
        break;
}
export default config;
