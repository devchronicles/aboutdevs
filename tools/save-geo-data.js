import config from '../config/config';
import { buildMassive } from '../src/server/helpers/massiveHelper';
import geo from '../data/geo.json';

const db = buildMassive(config.db.connectionString);

geo.states.forEach((state) => {
    console.log(`Saving state: ${state.name}`);
    const cities = state.cities;
    delete state.cities;
    const savedState = db.geo_state.saveSync(state);
    cities.forEach((city) => {
        console.log(`Saving city: ${city.name}`);
        city.stateid = savedState.id;
        db.geo_city.saveSync(city);
    });
});
