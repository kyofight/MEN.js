import * as SeedHelper from './app/modules/core/helpers/seed.helper';
import * as database from './app/bootstrap/mongoose';

database.connect()
	.then(() => {
		return SeedHelper.resetDatabase();
	})
	.then(() => {
		console.log('******** SEED DATA DUMP START ********');
		return SeedHelper.seedData()
			.then(() => {
				console.log('******** SEED DATA DUMP END ********');
				process.exit(0);
			}).catch((err) => {
				console.log('******** SEED DATA DUMP END WITH ERR ********', err);
				process.exit(0);
			});
	})
	.catch((err) => {
		console.log('******** SEED DATA DUMP END WITH ERR ********', err);
		process.exit(0);
	})
	.finally(() => {
		database.disconnect();
	});
