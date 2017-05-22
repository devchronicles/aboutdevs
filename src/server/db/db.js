import config from '../../../config/config';
import { buildMassive } from '../helpers/massiveHelper';


export default buildMassive(config.db.connectionString);
