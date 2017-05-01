const exec = require('child_process');

const selectedCommand = process.env.COMMAND;
const dbName = 'indiejobs';
const dbTestsName = 'indiejobs_tests';
const userName = 'indiejobs';

const commands = {
    create_dev_dbs: `
        echo ===Creating the ${dbName} dev db===
        createdb -E UTF8 --lc-collate C --lc-ctype C -U ${userName} -T template0 ${dbName}
        echo ===Creating the ${dbTestsName} dev db===
        createdb -E UTF8 --lc-collate C --lc-ctype C -U ${userName} -T template0 ${dbTestsName}
        echo ===Setting up the ${dbName} dev db===
        psql -f db/setupDb.sql -U ${userName} -d ${dbName}
        echo ===Setting up the ${dbName} dev db===
        psql -f db/setupDb.sql -U ${userName} -d ${dbTestsName}
    `,
    drop_dev_dbs: `
        echo ===Dropping the ${dbName} dev db===
        dropdb -U ${userName} ${dbName}
        echo ===Dropping the ${dbTestsName} dev db===
        dropdb -U ${userName} ${dbTestsName}
    `,
    clean_up_dev_dbs: `
        echo ===Cleaning up the ${dbName} dev db===
        psql -f db/cleanUpDb.sql -U ${userName} -d ${dbName}
        echo ===dropping the ${dbTestsName} dev db===
        psql -f db/cleanUpDb.sql -U ${userName} -d ${dbTestsName}
    `,
    generate_scripts: `
        echo ===Create the setupDb.sql file===
        pg_dump --schema-only -W -w -f db/setupDb.sql -p 5432 -U ${userName} ${dbName}
    `
};

console.log('===Starting DB Command===');
console.log(`Executing ${selectedCommand}`);

commands[selectedCommand].split('\n').forEach((command) => {
    console.log(exec.execSync(command).toString());
});



