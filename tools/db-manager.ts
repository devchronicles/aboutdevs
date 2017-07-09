import * as childProcess from "child_process";

const selectedCommand = process.env.COMMAND;
const dbName = 'indiejobs';
const dbTestsName = 'indiejobs_tests';
const userName = 'indiejobs';

console.log('===Starting DB Command===');
console.log(`Executing ${selectedCommand}`);

let commands;
switch (selectedCommand) {
    case "create_dev_dbs":
        commands = `
        echo ===Creating the ${dbName} dev db===
        createdb -E UTF8 --lc-collate C --lc-ctype C -U ${userName} -T template0 ${dbName}
        echo ===Creating the ${dbTestsName} dev db===
        createdb -E UTF8 --lc-collate C --lc-ctype C -U ${userName} -T template0 ${dbTestsName}
        echo ===Setting up the ${dbName} dev db===
        psql -f db/setupDb.sql -U ${userName} -d ${dbName}
        echo ===Setting up the ${dbName} dev db===
        psql -f db/setupDb.sql -U ${userName} -d ${dbTestsName}
    `;
        break;
    case "drop_dev_dbs":
        commands = `
        echo ===Dropping the ${dbName} dev db===
        dropdb -U ${userName} ${dbName}
        echo ===Dropping the ${dbTestsName} dev db===
        dropdb -U ${userName} ${dbTestsName}
    `;
        break;
    case "clean_up_dev_dbs":
        commands = `
        echo ===Cleaning up the ${dbName} dev db===
        psql -f db/cleanUpDb.sql -U ${userName} -d ${dbName}
        echo ===dropping the ${dbTestsName} dev db===
        psql -f db/cleanUpDb.sql -U ${userName} -d ${dbTestsName}
    `;
        break;
    case "generate_scripts":
        commands = `
        echo ===Create the setupDb.sql file===
        pg_dump --schema-only -W -w -f db/setupDb.sql -p 5432 -U ${userName} ${dbName}
        `;
        break;
}

commands.split('\n').forEach((command: string) => {
    const processedCommand = command.trim();
    if (processedCommand)
        childProcess.execSync(processedCommand);
});
