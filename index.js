module.exports = {
    command: 'appify <url>',
    register: (command, modules) => {
        command
            .option('-t,--title [title]')
            .action(async (url, command) => {
                // Make app 
                let title = (command.title|| new URL(url).hostame || 'Appify');
                let appId = title.toLowerCase().replace(/ /g, '.');
                let binaryName = title.toLowerCase().replace(/ /g, '-');
                await modules.creator.createApp(binaryName);
                modules.config.update('url', url);
                modules.config.update('applicationId', appId);
                modules.config.update('modes.window.title', title);
                modules.config.update('modes.window.enableInspector', false);
                // Bundle it
                await modules.bundler.bundleApp(true);
                console.log(`Please check the ${binaryName}/dist folder and find your desktop app.`);
            })
    }
};
