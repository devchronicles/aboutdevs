import * as faker from 'faker/locale/pt_BR';

import buildDb from '../src/server/db/buildDb';
import * as userService from '../src/server/services/userService';
import * as locationService from '../src/server/services/locationService';
import * as commonTypes from '../src/common/typings';
import * as serverTypes from '../src/server/typings';

buildDb()
    .then(async db => {

        // Make sure the default

        for (let i = 0; i < 50000; i++) {
            try {
                const displayName = faker.name.findName();
                const name = await userService.getValidUserName(db, faker.internet.userName());
                const email = `${name}@gmail.com`;

                const preUserProfile = {
                    display_name: displayName,
                    email: email,
                    gender: faker.random.number({ min: 0, max: 1 }),
                    name: name,
                    oauth_profiles: {},
                    photo_url: faker.internet.avatar(),
                };

                const insertedUser = (await db.user.insert(preUserProfile)) as serverTypes.User;

                const fakeProfile: commonTypes.UserProfile = {
                    id: insertedUser.id,
                    name: name,
                    displayName: displayName,
                    type: commonTypes.UserProfileType.PROFESSIONAL,
                    bio: faker.lorem.sentences(3),
                    activities: faker.lorem.sentences(3),
                    phoneWhatsapp: faker.phone.phoneNumber("(##) 9####-####"),
                    phoneAlternative: faker.phone.phoneNumber("(##) 9####-####"),
                    status: commonTypes.UserProfileStatus.READY,
                    // These are just so it will compile
                    profession: '',
                    address: 'Rua Henrique Surerus 28, Juiz de Fora MG',
                    services: [
                        {
                            index: 0,
                            service: faker.lorem.sentence(4).substring(0, 60)
                        },
                        {
                            index: 2,
                            service: faker.lorem.sentence(4).substring(0, 60)
                        },
                        {
                            index: 3,
                            service: faker.lorem.sentence(4).substring(0, 60)
                        }
                    ]
                };

                let randomProfessionId;
                let randomProfessionText;
                try {
                    const randomProfession = (await db.get_random_profession())[0];
                    randomProfessionId = randomProfession.id;
                    randomProfessionText = randomProfession.name_canonical;
                } catch(ex) {
                    console.error('Error getting random profession id. Are you sure you have populated the database?');
                    process.exit();
                }

                // location
                const country = await locationService.saveCountry(db, 'BR', 'Brazil' );
                const state = await locationService.saveState(db, 'MG', 'Minas Gerais', country.id);
                const city = await locationService.saveCity(db, 'Juiz de Fora', state.id);

                const neighborhood = 'Pavuna';
                const formattedAddress = `${faker.address.streetName()}, ${neighborhood}, ${faker.address.city()}`;
                var maxLat = -21.3743555;
                var minLat = -22.3248544;

                var minLong = -51.5182245;
                var maxLong = -50.2197401;

                var randomLat = Math.random() * (maxLat - minLat) + minLat;
                var randomLong = Math.random() * (maxLong - minLong) + minLong;

                const location = await locationService.saveLocation(db, formattedAddress, neighborhood, city.id, randomLat, randomLong);

                fakeProfile.profession = randomProfessionText;

                await userService.saveProfile(db, insertedUser.id, fakeProfile, randomProfessionId, location.id);
            }
            catch (ex) {
                console.log('error');
                console.error(ex);
            }
            console.log('Person saved ' + i);
        }

        process.exit();
    });