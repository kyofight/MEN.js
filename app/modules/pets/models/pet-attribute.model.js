import * as PetConstants from '../constants/pet.contants';
import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PetAttributeSchema = new Schema({
	age: {
		type: Number,
	},
	species: {
		type: String,
		trim: true,
		enum: PetConstants.SPECIES,
	},
	breed: {
		type: String,
		trim: true,
		enum: PetConstants.BREED,
		validate: [function (breed) {
			return (_.trim(breed) !== '' && this.species === 'dog') || (_.trim(breed) === '' && this.species !== 'dog');
		}, 'only species dog should have breed type'],
	},
});

const PetAttribute = mongoose.model('PetAttribute', PetAttributeSchema);

export default PetAttribute;