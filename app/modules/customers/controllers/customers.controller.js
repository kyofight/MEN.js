import * as ResponseHelper from '../../core/helpers/response.helper';
import * as RequestHelper from '../../core/helpers/request.helper';
import mongoose from 'mongoose';
const Customer = mongoose.model('Customer');

export const getCustomerById = () => {
	return (req, res, next) => {
		const params = RequestHelper.getRequiredFieldsFromRequest(req, ['id'], 'params');

		Customer.findOne({ _id: params.id })
			.then((result) => {
				return ResponseHelper.createSucceedSingleRespond(res, ResponseHelper.checkEmptyAndGetResult(result, 'found'));
			})
			.catch(next);
	}
}