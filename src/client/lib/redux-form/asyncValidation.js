export const USER_NAME_IS_TAKEN = 'user-name-is-taken';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values) => {
    return sleep(1000).then(() => {
        // simulate server latency
        if (['john', 'paul', 'george', 'ringo'].includes(values.name)) {
            throw { name: USER_NAME_IS_TAKEN };
        }
    });
};

export default asyncValidate;
