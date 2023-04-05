# neutralinojs-cli-appify
![npm](https://img.shields.io/npm/v/@neutralinojs/appify)
![npm](https://img.shields.io/npm/dt/@neutralinojs/appify)

Convert any SPA to a lightweight desktop app - Appify plugin for neu-cli


### How to install

Install neu-cli

```bash
npm install -g @neutralinojs/neu
```

Add appify plugin

```bash
neu plugins --add @neutralinojs/appify
```

Appify any web application, as shown in the following examples:

```bash
neu appify https://codezri.org/movieszri
neu appify --title "MoviesZri app" https://codezri.org/movieszri
```

### How to uninstall

Remove appify plugin

```bash
neu plugins --remove @neutralinojs/appify
```

### Appify is a plugin for neu

Check neu CLI plugin documentation [here](https://neutralino.js.org/docs/cli/neu-cli/#plugins) for more information about neu plugins.
