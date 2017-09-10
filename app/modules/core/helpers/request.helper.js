import _ from 'lodash';
import RequestErrors from '../errors/request.errors';
import ResponseHelper from './response.helper';

export const assignModelValues = (model, req, dataObj, type = 'body', options = {}) => {
	const defaultExcludes = ['__v', 'updateDate', 'createDate', 'status'];
	if (process.env.TEST_ENV !== 'yes') {
		defaultExcludes.push('_id');
	}

	options.exclude = options.exclude ? options.exclude.concat(defaultExcludes) : defaultExcludes;
	_.each(_.keys(model.schema.paths), (p) => {
		const parts = p.split('.');
		const parsedPath = options.pathCallback ? options.pathCallback(p, parts) : parts[0];
		if (options.exclude ? _.indexOf(options.exclude, parsedPath) === -1 && _.indexOf(options.exclude, p) === -1 : true) {
			const v = _.get(req[type], p);
			if (!_.isUndefined(v)) {
				_.set(dataObj, p, v);
			}
		}
	});

	return dataObj;
};

export const getFieldsFromRequest = (req, requiredFields, type = 'query') => {
	return _.reduce(requiredFields, (requiredFieldsData, field) => {
		if (!_.isUndefined(req[type][field.name]) && !_.isNull(req[type][field.name])) {
			requiredFieldsData[field.name] = field.callback ? field.callback(req[type][field.name]) : req[type][field.name];
		} else if (!_.isUndefined(field.value)) {
			requiredFieldsData[field.name] = field.value;
		}

		return requiredFieldsData;
	}, {});
};

export const getRequiredFieldsFromRequest = (req, requiredFields, type = 'body', isTrim = true) => {
	const requiredFieldsData = {};
	const error = RequestErrors.REQUEST_DATA_VALIDATION_REQUIRED_FIELD_MISSING;
	let missingField = '';
	const isInvalid = _.some(requiredFields, (field) => {
		if (!_.isUndefined(req[type][field]) && !_.isNull(req[type][field])) {
			requiredFieldsData[field] = isTrim && _.isString(req[type][field]) ? _.trim(req[type][field]) : req[type][field];
			if (requiredFieldsData[field] === '') {
				missingField = field;
				return true;
			}
			return false;
		} else {
			missingField = field;
			return true;
		}
	});

	if (!isInvalid) {
		if (process.env.TEST_ENV === 'yes' && req[type]._id) { // eslint-disable-line
			requiredFieldsData._id = req[type]._id; // eslint-disable-line
		}
		return requiredFieldsData;
	}

	error.message = `Missing required field "${missingField}" in "${type}"`;
	throw ResponseHelper.getError({ error, status: 400 });
};