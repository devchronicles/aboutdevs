import axios from 'axios';
import config from '../config/config';
import { buildMassive } from '../src/server/db/helpers/massiveHelper';

const db = buildMassive(config.db.connectionString);

const stateShorts = {
    Acre: 'AC',
    Alagoas: 'AL',
    Amapá: 'AP',
    Amazonas: 'AM',
    Bahia: 'BA',
    Ceará: 'CE',
    'Federal District': 'DF',
    'Espírito Santo': 'ES',
    Goiás: 'GO',
    Maranhão: 'MA',
    'Mato Grosso': 'MT',
    'Mato Grosso do Sul': 'MS',
    'Minas Gerais': 'MG',
    Pará: 'PA',
    Paraíba: 'PB',
    Paraná: 'PR',
    Pernambuco: 'PE',
    Piauí: 'PI',
    'Rio de Janeiro': 'RJ',
    'Rio Grande do Norte': 'RN',
    'Rio Grande do Sul': 'RS',
    Rondônia: 'RO',
    Roraima: 'RR',
    'Santa Catarina': 'SC',
    'São Paulo': 'SP',
    Sergipe: 'SE',
    Tocantins: 'TO'
};

const stateAlias = {
    'Federal District': 'Distrito Federal'
};

/**
 * Returns a promise that, when resolved, returns a list of all children of the given geonameId
 * @param {number} geonameId
 */
function getGeonameChildrenAsync(geonameId) {
    return axios.get(`http://www.geonames.org/childrenJSON?geonameId=${geonameId}&maxRows=1000`)
        .then((res) => {
            const children = res.data.geonames;
            const result = [];
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                result.push({
                    name: child.name,
                    longitude: child.lng,
                    geonameid: child.geonameId,
                    population: child.population,
                    latitude: child.lat
                });
            }
            return result;
        })
        .catch(error => {
            throw Error(error);
        });
}

function saveStateAsync(state) {
    console.log(`Saving state: ${state.name}`);
    return db.geo_state.saveAsync(state);
}

function saveCityAsync(city) {
    console.log(`Saving city: ${city.name}`);
    return db.geo_city.saveAsync(city);
}


getGeonameChildrenAsync(3469034)
    .then((children) => {
        const promises = [];
        for (let i = 0; i < children.length; i++) {
            const state = children[i];
            state.shortname = stateShorts[state.name];
            if (!state.shortname) throw Error(`Could not find shortname for ${state.name}`);
            promises.push(saveStateAsync(state));
        }
        return Promise.all(promises);
    })
    .then((states) => {
        const statePromises = [];
        for (let i = 0; i < states.length; i++) {
            const state = states[i];
            const promise = getGeonameChildrenAsync(state.geonameid)
                .then((cities) => {
                    const cityPromises = [];
                    cities.forEach((city) => {
                        city.stateid = state.id;
                        cityPromises.push(saveCityAsync(city));
                    });
                    return Promise.all(cityPromises);
                });
            statePromises.push(promise);
        }
        return Promise.all(statePromises);
    })
    .then(() => {
        process.exit();
    })
    .catch(ex => {console.log(ex);});

// axios.get('http://www.geonames.org/childrenJSON?geonameId=3469034')
//     .then((res) => {
//         const geoNames = res.data.geonames;
//         const states = [];
//         for (let i = 0; i < geoNames.length; i++) {
//             const state = geoNames[i];
//             states.push({
//                 name: state.name,
//                 longitude: state.lng,
//                 geonameId: state.geonameId,
//                 population: state.population,
//                 latitude: state.lat
//             });
//         }
//         return states;
//     })
//     .then((states) => {
//         const promises = [];
//         for (let i = 0; i < states.length; i++) {
//             const state = states[i];
//             const promise = axios.get(`http://www.geonames.org/childrenJSON?geonameId=${state.geonameId}`)
//                 .then((res) => {
//                     const geoNames = res.data.geonames;
//                     const cities = [];
//                     for (let j = 0; j < geoNames.length; j++) {
//                         const city = geoNames[j];
//                         console.log(city.name);
//                     }
//                 });
//             promises.push(promise);
//         }
//         return Promise.all(promises);
//     })
//     .catch((ex) => {
//         console.log(ex);
//     });
