# Express TypeScript Boilerplate

Boilerplate for Express using TypeScript object oriented approach.

## List of Contents

* [Express TypeScript Boilerplate](#express-typescript-boilerplate)
  * [List of Contents](#list-of-contents)
  * [Changes Log (What's New)](#changes-log-whats-new)
  * [Getting Started](#getting-started)
    * [Installation](#installation)
  * [Documentation](#documentation)
    * [Development Guide](#development-guide)
    * [Deploy in Production](#deploy-in-production)
  * [Contribution](#contribution)
  * [Versioning](#versioning)
  * [Authors](#authors)
  * [License](#license)

## Changes Log (What's New)

**Base Features (v1.0.0)**

* Application hot reload when file changes.
* Object oriented approach using TypeScript.

## Getting Started

For now, this boilerplate is available to be clone, only through this GitHub repository.

### Installation

To use this boilerplate, first create your clone of this repository.

```bash
git clone https://github.com/danang-id/express-typescript-boilerplate.git my-project
cd my-project
```

Then, install the dependencies using package manager of your choice. You might use [`npm`](https://www.npmjs.org/) org [`Yarn`](https://www.yarnpkg.com/).

```bash
# If you are using npm
npm install
# OR IF you are using Yarn
yarn install
```

## Documentation

### Development Guide

**Application Hot Reload**

Use `start` command for development, to start node monitoring service to watches for files change.

```bash
# If you are using npm
npm start
# OR IF you are using Yarn
yarn start
```

As you save new file in `src` folder, or type `rs` to terminal, application will be restarted. Use `Ctrl+C` to break free from the monitoring service.

**Configuring Application**

To configure app, use `.env` file in the root folder. Configuration will be loaded using `..Config` classes.

### Deploy in Production

First, create the production build of your application.

```bash
# If you are using npm
npm run build
# OR IF you are using Yarn
yarn build
```

To use this app in production, you may use app like `pm2` to start this program. Install pm2 globally if you have not.

```bash
# If you are using npm
npm install -g pm2
# OR IF you are using Yarn
yarn global add pm2
```

Make sure `pm2` has been installed by issuing `pm2` command. Terminal restart may be required after install. After `pm2` has been installed, start this program in `pm2` as cluster mode.

```bash
DEBUG=my-project:* pm2 start build/app.js -i 0 --name "my-project"
```

## Contribution

To contribute, simply fork this project, and issue a pull request.

## Versioning

This project is using [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/danang-id/express-typescript-boilerplate/tags).

## Authors

* **Danang Galuh Tegar Prasetyo** - _Initial work_ - [danang-id](https://github.com/danang-id)

See also the list of [contributors](https://github.com/danang-id/express-typescript-boilerplate/contributors) who participated in this project.

## License

This project is licensed under the Apache License version 2.0 (Apache-2.0). See [LICENSE](LICENSE) for details.