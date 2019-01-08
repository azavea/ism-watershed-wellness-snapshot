# ism-watershed-wellness-snapshot
A tool to collect and display watershed wellness indicators for the International Seaport Museum

### Requirements

* Yarn

### Getting Started

Install the application and all required dependencies.

```sh
./scripts/setup
```

#### Development

The application requires a MapBox API key.

First, create a `.env` file in the `src/app/` repo.

Next, add the following line to that file:

```
REACT_APP_MAPBOX_API_KEY=<YOUR_API_KEY_HERE>
```

Rebuild Docker images and run application.

```sh
./scripts/server
```

### Ports

| Service            | Port                            |
| ------------------ | ------------------------------- |
| Create React App Server | [`3000`](http://localhost:3000) |

### Testing

```
./scripts/test
```

### Scripts

| Name           | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `cibuild`      | Build project for CI                                          |
| `lint`         | Lint source code                                              |
| `server`       | Run Create React App Server                                   |
| `setup`        | Install project dependencies                                  |
| `test`         | Run unit tests                                                |
| `update`       | Update project dependences                                    |

### Adding NPM Packages

To add a new NPM package to the project:

```
yarn add {package-name}
```

#### Notes

* We usually pin packages to a specific version to minimize build errors.
* For packages in the regular/non-dev dependencies section of `package.json`,
  manually add the package name to the `vendor` array in `webpack.config.json`
