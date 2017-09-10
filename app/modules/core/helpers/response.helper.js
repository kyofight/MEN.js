import _ from 'lodash';
import DatabaseErrors from '../errors/database.errors';

export const checkEmptyAndGetResult = (result, type) => {
	if (_.isEmpty(result)) {
		throw getError({
			error: DatabaseErrors[`DATABASE_RECORD_NOT_${_.toUpper(type)}`],
			status: 400,
		});
	}
	return result;
};


export const getError = (err) => {
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


export const createSucceedSingleRespond = (res, data, statusCode = 200) => {
	const result = {};
	result.success = true;
	result.data = data;
	res.status(statusCode).json(result);
};


export const createSuccessListRespond = (res, list, page, pageSize, total, statusCode = 200) => {
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
