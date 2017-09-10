export default {
	server: {
		host: process.env.HOST || '127.0.0.1',
		port: process.env.PORT || 8080,
		secure: {
			ssl: false,
		},
	},
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://localhost/pet',
		options: {},
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
