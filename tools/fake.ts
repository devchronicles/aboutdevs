import * as faker from 'faker/locale/pt_BR';

import buildDb from '../src/server/db/buildDb';
import * as userService from '../src/server/services/userService';
import * as commonTypes from '../src/common/typings';
import * as serverTypes from '../src/server/typings';

buildDb()
    .then(async db => {

        for (let i = 0; i < 1000; i++) {
            try {
                const displayName = faker.name.findName();
                const name = faker.internet.userName();

                const preUserProfile = {
                    display_name: displayName,
                    email: faker.internet.email(),
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
                };

                const randomProfessionId = (await db.get_random_profession())[0].id;

                await userService.saveProfile(db, insertedUser.id, fakeProfile, randomProfessionId);
            }
            catch (ex) {
                console.log('error');
            }
            console.log('Person saved ' + i);
        }




        process.exit();
    });