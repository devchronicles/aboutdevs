import massive from 'massive';

/**
 * This creates massive object
 * This means that we get
 * @param connectionObject
 * @returns {*}
 */
export async function buildMassive(connectionObject) {
    if (!connectionObject) throw Error('\'connectionObject\' should be truthy');

    return massive(connectionObject);
}
