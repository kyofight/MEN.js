import * as ResponseHelper from '../helpers/response.helper';
import * as RequestHelper from '../helpers/request.helper';

export default class CoreController {
	constructor(model) {
		this.model = model;
	}

	getById() {
		const self = this;
		return (req, res, next) => {
			const params = RequestHelper.getRequiredFieldsFromRequest(req, ['id'], 'params');

			self.model.findOne({ _id: params.id })
				.then((result) => {
					return ResponseHelper.createSucceedDetailRespond(res, ResponseHelper.checkEmptyAndGetResult(result, 'found'));
				})
				.catch(next);
		}
	}

	create() {
		const self = this;
		return (req, res, next) => {
			const modelValues = {};
			RequestHelper.assignModelValues(self.model, req, modelValues);
			self.model.create(modelValues)
				.then((dataObj) => {
					return ResponseHelper.createSucceedDetailRespond(res, ResponseHelper.checkEmptyAndGetResult(dataObj, 'created'), 201);
				})
				.catch(next);
		}
	}

}