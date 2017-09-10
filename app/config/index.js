const env = process.env.NODE_ENV || 'local';
const config = require(`./${process.env.NODE_ENV}`).default;
config.env = env;

export default config;