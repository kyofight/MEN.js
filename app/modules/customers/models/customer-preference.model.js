import * as PetConstants from '../../pets/constants/pet.contants';
import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CustomerPreferenceSchema = new Schema({
	// todo: validate ageFrom < ageTo
	ageFrom: {
		type: Number,
		min: [0, 'The ({PATH}) should not be less than ({VALUE}).'],
		max: [100000, 'The ({PATH}) ({VALUE}) has reached the upper limit ({MAX}).'],
		validate: {
			validator: Number.isInteger,
			message: '({VALUE}) is not an integer value'
		}
	},
	ageTo: {
		type: Number,
		min: [0, 'The ({PATH}) should not be less than ({VALUE}).'],
		max: [100000, 'The ({PATH}) ({VALUE}) has reached the upper limit ({MAX}).'],
		validate: {
			validator: Number.isInteger,
			message: '({VALUE}) is not an integer value'
		}
	},
	species: [{
		type: String,
		trim: true,
		enum: PetConstants.SPECIES,
		// todo: validate no duplicate
	}],
	breed: [{
		type: String,
		trim: true,
		enum: PetConstants.BREED,
		// todo: validate no duplicate
		validate: [function (breed) {
			return (_.trim(breed) !== '' && _.indexOf(this.species, 'dog') !== -1) || (_.trim(breed) === '' && _.indexOf(this.species, 'dog') === -1);
		}, 'only species dog should have breed type'],
	}],
});

const CustomerPreference = mongoose.model('CustomerPreference', CustomerPreferenceSchema);

export default CustomerPreference;