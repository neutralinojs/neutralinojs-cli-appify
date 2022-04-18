async function httpGet(url)  {
    return new Promise((resolve, reject) => {
      const http = require('http'),
        https = require('https');
  
      let client = http;
  
      if (url.toString().indexOf("https") === 0) {
        client = https;
      }
  
      client.get(url, (resp) => {
        let chunks = [];
  
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          chunks.push(chunk);
        });
  
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            const regex1 = RegExp('<title>([^<]*)</title>','g');
            var title= regex1.exec(chunks.toString());
          resolve(title[1]);
        });
  
      }).on("error", (err) => {
        reject(err);
      });
    });
  }
  
  module.exports = {
    command: 'appify <url>',
    register: (command, modules) => {
        command
            .option('-t,--title [title]')
            .action(async (url, command) => {
                // Make app 
                let title = (command.title || await httpGet(url) || 'Appify');
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
  


