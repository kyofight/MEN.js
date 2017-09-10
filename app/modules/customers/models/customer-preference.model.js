import * as PetConstants from '../../pets/constants/pet.contants';
import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CustomerPreferenceSchema = new Schema({
	age: {
		type: Number,
	},
	species: [{
		type: String,
		trim: true,
		enum: PetConstants.SPECIES,
	}],
	breed: [{
		type: String,
		trim: true,
		enum: PetConstants.BREED,
		validate: [function (breed) {
			return (_.trim(breed) !== '' && _.indexOf(this.species, 'dog') !== -1) || (_.trim(breed) === '' && _.indexOf(this.species, 'dog') === -1);
		}, 'only species dog should have breed type'],
	}],
});

const CustomerPreference = mongoose.model('CustomerPreference', CustomerPreferenceSchema);

export default CustomerPreference;