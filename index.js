const https = require("https")

const getTitle = async (url) => {
 return new Promise((resolve,rej)=>{  
    https.get(url, (res) => {
      var body='', title='';
      res.on('data',  (chunk) => {
        body+=chunk;
        if (!title && /<title>.*<\/title>/im.test(body)){
          title=body.match(/<title>(.*)<\/title>/im)[1];
        }
      });
      res.on('end', () => {
          resolve(title)
      });
    }).on('error', (e) => {
        rej("")
    });
  })
}


module.exports = {
    command: 'appify <url>',
    register: (command, modules) => {
        command
            .option('-t,--title [title]')
            .action(async (url,command) => {
                // Make app 
                let title = (command.title|| await getTitle(url) || 'Appify');
                let appId = title.toLowerCase().replace(/ /g, '.');
                let binaryName = title.toLowerCase().replace(/ /g, '-');
                await modules.creator.createApp(binaryName);
                modules.config.update('url', url);
                modules.config.update('applicationId', appId);
                modules.config.update('modes.window.title', title);
                modules.config.update('modes.window.enableInspector', false);
                // Bundle it
                await modules.bundler.bundleApp(true);
                console.log(`Please check the .${binaryName}/dist folder and find your desktop app.`);
            })
    }
};
