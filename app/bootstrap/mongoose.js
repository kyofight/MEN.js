import _ from 'lodash';
import chalk from 'chalk';
import mongoose from 'mongoose';
import glob from 'glob';
import path from 'path';
import config from '../config';

// Load the mongoose models
export const loadModels = () => {
  return new Promise((resolve, reject) => {
    try {
      _.each(glob.sync(`app/modules/*/models/*.js`), (routeFile) => {
        require(path.resolve(routeFile));
      });
      console.info(chalk.yellow('>> Finished injecting models'));
      resolve('success');
    } catch (err) {
      reject(err);
    }
  })
}

// Initialize Mongoose
export const connect = () => {
  mongoose.Promise = config.db.promise;

  const options = _.merge(config.db.options || {}, { useMongoClient: true });

  return mongoose
    .connect(config.db.uri, options)
    .then(function (connection) {
      // Enabling mongoose debug mode if required
      mongoose.set('debug', config.db.debug);

      console.info(chalk.yellow('>> Database is connected'));
      return connection.db;
    })
}

// Disconnect from database
export const disconnect = () => {
  mongoose.connection.db
    .close(function (err) {
      if (err) {
        throw err;
      }
      console.info(chalk.yellow('Disconnected from MongoDB.'));
    });
};


/**
 * Get unique error field name
 */
export const getUniqueErrorMessage = (err) => {
  let output;

  try {
    let begin = 0;
    if (err.errmsg.lastIndexOf('.$') !== -1) {
      begin = err.errmsg.lastIndexOf('.$') + 2;
    } else {
      begin = err.errmsg.lastIndexOf('index: ') + 7;
    }
    const fieldName = err.errmsg.substring(begin, err.errmsg.lastIndexOf('_1'));
    output = `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} already exists`;
  } catch (ex) {
    output = 'Unique field already exists';
  }

  return output;
};

/**
 * Get the error message from error object
 */
export const getErrorMessage = (err) => {
  let message = err.message || 'Unexpected Error';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = 'Something went wrong';
    }
  } else if (err.errors) {
    _.some(err.errors, (error) => {
      if (error.message) {
        message = error.message;
        return true;
      }
    });
  }

  return message;
};