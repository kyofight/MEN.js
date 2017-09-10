import config from '../config';
import * as mongooseService from './mongoose';
import express from './express';
import chalk from 'chalk';


export default () => {
  return mongooseService.connect()
    .then(() => {
      return mongooseService.loadModels();
    })
    .then(() => {
      return express();
    })
    .then((app) => {
      // Start the app by listening on <port> at <host>
      app.listen(config.server.port, config.server.host, function () {
        // Create server URL
        const server = `${config.server.secure.ssl === 'secure' ? 'https://' : 'http://'}${config.server.host}:${config.server.port}`;
        // Logging initialization
        console.log('--');
        console.log(chalk.green(`Environment:     ${process.env.NODE_ENV}`));
        console.log(chalk.green(`Server:          ${server}`));
        console.log(chalk.green(`Database:        ${config.db.uri}`));
        console.log('--');
      });
    })
    .catch(function (err) {
      console.error(chalk.red('>> error bootstrapping the application', err.stack));
    });
};

