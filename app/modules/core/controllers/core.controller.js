import RequestErrors from '../errors/request.errors';
import DatabaseErrors from '../errors/database.errors';
import _ from 'lodash';

export default class CoreController {
	constructor(model) {
		this.model = model;
	}

	/**
	 * common routes functions
	 */
	getById() {
		const self = this;
		return (req, res, next) => {
			const params = self.getRequiredFieldsFromRequest(req, ['id'], 'params');

			self.model.findOne({ _id: params.id })
				.then((result) => {
					return self.createSucceedDetailRespond(res, self.checkEmptyAndGetResult(result, 'found'));
				})
				.catch(next);
		}
	}

	create() {
		const self = this;
		return (req, res, next) => {
			const modelValues = {};
			self.assignModelValues(self.model, req, modelValues);
			self.model.create(modelValues)
				.then((dataObj) => {
					return self.createSucceedDetailRespond(res, self.checkEmptyAndGetResult(dataObj, 'created'), 201);
				})
				.catch(next);
		}
	}

	/**
	 * common request functions
	 */
	assignModelValues(model, req, dataObj, type = 'body', options = {}) {
		const defaultExcludes = ['__v', 'updateDate', 'createDate', 'status'];
		if (process.env.NODE_ENV !== 'test') {
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

	getFieldsFromRequest(req, requiredFields, type = 'query') {
		return _.reduce(requiredFields, (requiredFieldsData, field) => {
			if (!_.isUndefined(req[type][field.name]) && !_.isNull(req[type][field.name])) {
				requiredFieldsData[field.name] = field.callback ? field.callback(req[type][field.name]) : req[type][field.name];
			} else if (!_.isUndefined(field.value)) {
				requiredFieldsData[field.name] = field.value;
			}

			return requiredFieldsData;
		}, {});
	};

	getRequiredFieldsFromRequest(req, requiredFields, type = 'body', isTrim = true) {
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
			if (process.env.NODE_ENV === 'test' && req[type]._id) { // eslint-disable-line
				requiredFieldsData._id = req[type]._id; // eslint-disable-line
			}
			return requiredFieldsData;
		}

		error.message = `Missing required field "${missingField}" in "${type}"`;
		throw this.getError({ error, status: 400 });
	};

	/**
	 * common response functions
	 */
	checkEmptyAndGetResult(result, type) {
		if (_.isEmpty(result)) {
			throw getError({
				error: DatabaseErrors[`DATABASE_RECORD_NOT_${_.toUpper(type)}`],
				status: 400,
			});
		}
		return result;
	};


	getError(err) {
		const error = new Error();
		if (_.isUndefined(error.error)) {
			error.error = err;
		} else {
			error.error = err.error;
		}
		error.status = err.status || 400;
		error.message = err.message;
		error.expected = err.expected;
		return error;
	};

	createSucceedDetailRespond(res, data, statusCode = 200) {
		const result = {};
		result.success = true;
		result.data = data;
		res.status(statusCode).json(result);
	};


	createSuccessPaginationRespond(res, list, page, pageSize, total, statusCode = 200) {
		const result = {};
		result.success = true;
		result.pagination = {
			pageSize,
			page,
			total,
			totalPages: Math.ceil(total / pageSize),
		};
		result.data = list;
		res.status(statusCode).json(result);
	};
}