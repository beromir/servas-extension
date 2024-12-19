# Servas Extension

Browser extension for the self-hosted, open source bookmark manager [Servas](https://github.com/beromir/servas).

## Features
- Add current tab to Servas.
- Add bookmark to groups and apply tags.
- Dark and light theme.

## Installation
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/servas)
- [Chrome](https://chromewebstore.google.com/detail/servas/ankaoihcpijhkbkfccncakngkfgahflp)

## Development

**Requirements**

- Node.js v22
- npm v10

```shell
// Install dependencies
npm install

// Start watch process
npm run watch
```

### Build for production

```shell
// Install dependencies
npm install

// Generate production files
npm run build
```

The production files are generated in the `dist` directory.

````shell
// Validate the extension source
npm run extension:lint

// Create an extension package
npm run extension:build
````
