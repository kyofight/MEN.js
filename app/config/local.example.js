export default {
	server: {
		host: process.env.HOST || '127.0.0.1',
		port: process.env.PORT || 8080,
		secure: {
			ssl: false,
			/**
			 privateKey: './config/sslcerts/key.pem',
			 certificate: './config/sslcerts/cert.pem',
			 caBundle: './config/sslcerts/cabundle.crt'
			 **/
		},
	},
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://localhost/pet',
		options: {
			/**
			 * Uncomment to enable ssl certificate based authentication to mongodb
			 * servers. Adjust the settings below for your specific certificate
			 * setup.
			 * for connect to a replicaset, rename server:{...} to replset:{...}

			 ssl: true,
			 sslValidate: false,
			 checkServerIdentity: false,
			 sslCA: fs.readFileSync('./config/sslcerts/ssl-ca.pem'),
			 sslCert: fs.readFileSync('./config/sslcerts/ssl-cert.pem'),
			 sslKey: fs.readFileSync('./config/sslcerts/ssl-key.pem'),
			 sslPass: '1234'
			 */
		},
		// Enable mongoose debug mode
		debug: process.env.MONGODB_DEBUG || false,
		promise: global.Promise
	},
	log: {
		// logging with Morgan - https://github.com/expressjs/morgan
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		fileLogger: {
			directoryPath: process.cwd(),
			fileName: 'app.log',
			maxsize: 10485760,
			maxFiles: 2,
			json: false
		}
	},
}
