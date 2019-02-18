const menus = {
    main:
        '\n' +
        'mole [command] <options>\n' +
        '\n' +
        'scrap .............. scrap a url\n' +
        'version ............ show package version\n' +
        'help ............... show help menu for a command\n'
};

module.exports = (args) => {
    const command = args._[0] === 'help'
        ? args._[1]
        : args._[0]

    console.log(menus[command] || menus.main);
};
