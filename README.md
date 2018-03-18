# Junior Front-End Web Developer Test

### Technologies used:

- Vue.js 2
- Bootstrap 4
- Webpack 4
- Axios
- SASS
- Babel (ES6/7)

## Running localy

### Requirements

- Node.js 6.x or later
- npm 3.10.x or later
- yarn (optional)

### Running the development server

Before you do anything, make sure to install all of the package dependencies:

```bash
npm install
```

Then you can start the development server localy by running the following npm
command in a terminal:

```bash
npm run start
```

This will start a local development server on `localhost:8080` by default,
you can change the port by simply editing the `dev.port` environment variable
located in the `build/config.js` file. The development server has Hot Module
Replacement enabled, so whatever changes made to the app's code should reflect
directly in the browser window.

### Building for production

You can generate the compiled application asset files by running the following
npm command in a terminal:

```bash
npm run build
```

Once finished, you can find all the compiled assets under the `dist/` directory
