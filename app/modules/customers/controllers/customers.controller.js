import CoreController from '../../core/controllers/core.controller';
import mongoose from 'mongoose';
import _ from 'lodash';
const Customer = mongoose.model('Customer');
const Pet = mongoose.model('Pet');

export default new class CustomerController extends CoreController {
	constructor() {
		super(Customer);
	}

	/**
	 * todo: filter out available from of the pets
	 */
	getPetMatchesById() {
		const self = this;
		return (req, res, next) => {
			const params = self.getRequiredFieldsFromRequest(req, ['id'], 'params');

			self.model.findOne({ _id: params.id })
				.then((result) => {
					const customer = self.checkEmptyAndGetResult(result, 'found');
					const condition = {};
					if (!_.isEmpty(customer.preference.ageFrom)) {
						condition['attributes.age'] = { $gte: customer.preference.ageFrom };
					}
					if (!_.isEmpty(customer.preference.ageTo)) {
						condition['attributes.age'] = { $lte: customer.preference.ageTo };
					}
					if (!_.isEmpty(customer.preference.species)) {
						condition['attributes.species'] = { $in: customer.preference.species };
					}
					if (!_.isEmpty(customer.preference.breed)) {
						condition['attributes.breed'] = { $in: customer.preference.breed };
					}

					return Pet.find(condition);
				})
				.then((result) => {
					return self.createSucceedDetailRespond(res, result);
				})
				.catch(next);
		}
	}
}