import express from 'express';
import morgan from 'morgan';
import logger from './logger';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import helmet from 'helmet';
import _ from 'lodash';
import chalk from 'chalk';
import glob from 'glob';
import path from 'path';
import * as mongooseService from './mongoose';
import DatabaseErrors from '../modules/core/errors/database.errors';
import GeneralErrors from '../modules/core/errors/general.errors';
import config from '../config';

/**
 * Initialize local variables
 */
const initLocalVariables = function (app) {
  // Setting application local variables
  app.locals.env = config.env;
  app.locals.domain = config.domain;
};

/**
 * Initialize application middleware
 */
const initMiddleware = function (app) {
  // Enable logger (morgan) if enabled in the configuration file
  if (_.has(config, 'log.format')) {
    app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));
  }

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
};

/**
 * Configure Helmet headers configuration for security
 */
const initHelmetHeaders = function (app) {
  // six months expiration period specified in seconds
  const SIX_MONTHS = 15778476;

  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.hsts({
    maxAge: SIX_MONTHS,
    includeSubdomains: true,
    force: true
  }));
  app.disable('x-powered-by');
};

/**
 * Configure the modules server routes
 */
const initModulesServerRoutes = function (app) {
  // Globbing routing files
  try {
    const router = express.Router();
    _.each(_.reverse(_.sortBy(glob.sync(`app/modules/*/routes/*.js`))), (routeFile) => {
      require(path.resolve(routeFile)).default(router);
    });
    app.use('/api', router);
    console.info(chalk.yellow('>> Finished injecting routes'));
  } catch (err) {
    console.error(chalk.red('>> error bootstrapping the application', err.stack));
    throw err;
  }
};


/**
 * Configure error handling
 */
const initErrorRoutes = function (app) {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // catch every thrown error
  app.use((err, req, res, next) => {
    if (_.isUndefined(err.error) && err.status !== 404) {
      if (err.name === 'MongoError') {
        err.error = DatabaseErrors.DATABASE_DATA_MODEL_FIELD_UNIQUE_ERROR;
      } else if (err.name === 'ValidationError') {
        err.error = DatabaseErrors.DATABASE_DATA_MODEL_FIELD_VALIDATION_ERROR;
      } else {
        err.error = GeneralErrors.API_ERROR_UNEXPECTED_ERROR;
      }

      err.error.message = mongooseService.getErrorMessage(err);
      if (err.name === 'CastError' && err.path === '_id') {
        err.error = DatabaseErrors.DATABASE_DATA_MODEL_OBJECT_ID_FORMAT_INVALID;
      }
    }

    // dont expose error to the client, log it to file
    let errInfo;
    let ip;
    let requestInfo = '';
    try {
      ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
      requestInfo = `{data: ${JSON.stringify(err.data)}, body: ${JSON.stringify(req.body)},
      query: ${JSON.stringify(req.query)}, params: ${JSON.stringify(req.params)}}, 
        file: ${JSON.stringify(req.file || req.files)}`;
      errInfo = err.stack || err.message;
    } catch (e) {
      requestInfo = 'N/A';
      errInfo = '';
    }

    const errorLog = `${ip} ${req.method} ${req.originalUrl}:
      Request Object => ${requestInfo}, Error Respond Stack => ${errInfo}`;

    console.error(chalk.red('>> Thrown error', errorLog, JSON.stringify(err)));

    const result = {};
    result.success = false;
    result.error = err.error;
    result.request = {
      params: req.params,
      body: req.body,
      query: req.query,
    };
    result.expected = err.expected;

    if (_.indexOf(['production', 'staging'], app.locals.env) === -1) {
      result.debug = err.data || err.debug || err.stack || err.message || 'error is undefined';
    }
    if (err.name === 'TokenExpiredError') {
      err.status = 401;
    }

    res.status(err.status || 500).json(result);
  });
};

/**
 * Initialize the Express application
 */
export default () => {
  // Initialize express app
  const app = express();

  // Initialize local variables
  initLocalVariables(app);

  // Initialize Express middleware
  initMiddleware(app);

  // Initialize Helmet security headers
  initHelmetHeaders(app);

  // Initialize modules server routes
  initModulesServerRoutes(app);

  // Initialize error routes
  initErrorRoutes(app);

  return app;
};
