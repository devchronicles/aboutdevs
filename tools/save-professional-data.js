import { v4 } from 'uuid';
import config from '../config/config';
import { buildMassive } from '../src/server/db/helpers/massiveHelper';
import professions from '../data/professions.json';


const db = buildMassive(config.db.connectionString);

professions.data.forEach((profession) => {
    console.log(`Saving profession: ${profession}`);
    db.profession.insert({
        id: v4(),
        name_canonical: profession
    });
});
