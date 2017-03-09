import fs from 'fs';
import axios from 'axios';

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
        .catch((error) => {
            throw Error(error);
        });
}

getGeonameChildrenAsync(3469034)
    .then((states) => {
        // populates the shortNames
        states.forEach((state) => {
            state.shortname = stateShorts[state.name];
            if (!state.shortname) throw Error(`Could not find shortname for ${state.name}`);
        });
        return states;
    })
    .then((states) => {
        const statePromises = [];
        states.forEach((state) => {
            const promise = getGeonameChildrenAsync(state.geonameid)
                .then((cities) => {
                    state.cities = cities;
                });
            statePromises.push(promise);
        });
        return Promise.all(statePromises)
            .then(() => states);
    })
    .then((states) => {
        const fileContent = JSON.stringify({ states }, null, 4);
        fs.writeFileSync('./data/geo.json', fileContent);
    })
    .catch((ex) => { console.log(ex); });
