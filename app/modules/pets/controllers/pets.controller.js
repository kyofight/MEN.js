import * as ResponseHelper from '../../core/helpers/response.helper';
import * as RequestHelper from '../../core/helpers/request.helper';
import CoreController from '../../core/controllers/core.controller';
import mongoose from 'mongoose';
import _ from 'lodash';
const Pet = mongoose.model('Pet');
const Customer = mongoose.model('Customer');

export default new class PetController extends CoreController {
	constructor() {
		super(Pet);
	}

	/**
	 * todo: filter out available from of the pets
	 */
	getCustomerMatchesById() {
		const self = this;
		return (req, res, next) => {
			const params = RequestHelper.getRequiredFieldsFromRequest(req, ['id'], 'params');

			self.model.findOne({ _id: params.id })
				.then((result) => {
					const pet = ResponseHelper.checkEmptyAndGetResult(result, 'found');
					const condition = {};
					if (!_.isEmpty(pet.attributes.age)) {
						condition['preference.ageFrom'] = { $lte: pet.attributes.age };
						condition['preference.ageTo'] = { $gte: pet.attributes.age };
					}
					if (!_.isEmpty(pet.attributes.species)) {
						condition['preference.species'] = pet.attributes.species;
					}
					if (!_.isEmpty(pet.attributes.breed)) {
						condition['preference.breed'] = pet.attributes.breed;
					}

					return Customer.find(condition);
				})
				.then((result) => {
					return ResponseHelper.createSucceedDetailRespond(res, result);
				})
				.catch(next);
		}
	}
}