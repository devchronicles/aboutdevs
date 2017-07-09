import * as colors from 'colors';
import config from '../config/config';

console.log(colors.green('Configuration'));
console.log(JSON.stringify(config, null, 4));
