module.exports = {
    command: 'appify <url>',
    register: (command, modules) => {
        command
            .option('-t,--title [title]')
            .action((url, command) => {
                let title = (command.title || 'Appify');
                let appname = title.toLowerCase().replace(/ /g, '');
                modules.creator.createApp(appname, 'js', () => {
                    modules.settings.update('url', url, appname);
                    modules.settings.update('window.title', title, appname);
                })
            })
    }
};