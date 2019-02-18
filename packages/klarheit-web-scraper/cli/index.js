const minimist = require('minimist');

module.exports = () => {
    const args = minimist(process.argv.slice(2));
    let command = args._[0] || 'help';

    if (args.version || args.v) command = 'version';
    if (args.help || args.h) command = 'help';

    switch (command) {

        case 'scrap':
            require('./commands/scrap')(args);
            break;

        case 'version':
            require('./commands/version')(args);
            break;

        case 'help':
            require('./commands/help')(args);
            break;

        default:
            console.error(`"${command}" is not a valid command!`);
            break;
    }
};
