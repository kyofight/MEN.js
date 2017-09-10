import mongoose from 'mongoose';
import StatusConstants from '../constants/status.contants';
import * as PetConstants from '../constants/pet.contants';
import { PetAttributeSchema } from './pet-attribute.model';
import _ from 'lodash';
const Schema = mongoose.Schema;

export const PetSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: true,
		trim: true,
		unique: true,
		validate: [(username) => {
			return PetConstants.PATTERNS.name.test(username);
		}, 'username must start with a letter or number.'],
	},
	availableFrom: {
		type: Date,
		required: true,
		default: Date.now,
	},
	attributes: PetAttributeSchema,
	status: {
		type: Number,
		required: true,
		default: StatusConstants.ACTIVE,
		validate: [(value) => {
			return _.indexOf(_.values(StatusConstants), value) !== -1;
		}, 'invalid value ({VALUE})'],
	},
	updateDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
	createDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

const Pet = mongoose.model('Pet', PetSchema);

export default Pet;