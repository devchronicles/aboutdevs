import { v4 } from 'uuid';
import config from '../config/config';
import { buildMassive } from '../src/server/helpers/massiveHelper';
import professions from '../data/professions-processed.json';


const db = buildMassive(config.db.connectionString);

professions.data.forEach((profession) => {
    console.log(`Saving profession: ${profession}`);
    db.profession.insertSync({
        id: v4(),
        name_canonical: profession[0],
        name_feminine: profession[1]
    });
});
process.exit(0);
