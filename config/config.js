/*eslint-disable*/
let config;
switch (process.env.NODE_ENV) {
    case 'development':
        config = require('./config.dev');
        break;
    case 'test':
        config = require('./config.test');
        break;
    default:
        config = require('./config.prod');
        break;
}
export default config;
/*eslint-enable*/
