import _ from 'lodash';
import glob from 'glob';
import path from 'path';

export const cleanAndCreate = (Model, type, data) => {
	return Promise.all(_.reduce(data, (result, d) => {
		result.push(Model.create(d).then((u) => {
			console.log(`created ${type} #${u.id}`);
		})
			.catch((err) => {
				console.log(`fail to create ${type} #${err.data || err.message}`, JSON.stringify(err))
			}));
		return result;
	}, []))
		.then(() => {
			console.log(`>>>>>>> finished creating ${type}`);
		})
		.catch((err) => {
			console.log(`fail to create ${type} #${err.data || err.message}`);
		})
};

export const resetDatabase = () => {
	return Promise.all(_.reduce(glob.sync('app/modules/*/models/*.js'), (result, routeFile) => {
		const modelInstance = require(path.resolve(routeFile)).default;
		if (modelInstance) {
			result.push(Promise.resolve(modelInstance.remove({})));
			if (modelInstance.getRevisionModel) {
				const revision = modelInstance.getRevisionModel();
				result.push(revision.remove({}));
			}
		}
		return result;
	}, []));
};

export const seedData = () => {
	return Promise.all(_.reduce(glob.sync('app/modules/*/seed/*.js'), (result, routeFile) => {
		result.push(require(path.resolve(routeFile)).default());
		return result;
	}, []));
}

