import * as PetConstants from '../constants/pet.contants';
import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PetAttributeSchema = new Schema({
	age: {
		type: Number,
		min: [0, 'The ({PATH}) should not be less than ({VALUE}).'],
		max: [100000, 'The ({PATH}) ({VALUE}) has reached the upper limit ({MAX}).'],
		validate: {
			validator: Number.isInteger,
			message: '({VALUE}) is not an integer value'
		}
	},
	specie: {
		type: String,
		trim: true,
		enum: PetConstants.SPECIES,
	},
	breed: {
		type: String,
		trim: true,
		enum: PetConstants.BREED,
		validate: [function (breed) {
			return (_.trim(breed) !== '' && this.specie === 'dog') || (_.trim(breed) === '' && this.specie !== 'dog');
		}, 'only specie dog should have breed type'],
	},
});

const PetAttribute = mongoose.model('PetAttribute', PetAttributeSchema);

export default PetAttribute;