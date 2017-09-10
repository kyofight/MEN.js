import mongoose from 'mongoose';
import StatusConstants from '../constants/status.contants';
import * as CustomerConstants from '../constants/customers.contants';
import _ from 'lodash';
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
	username: {
		type: String,
		required: true,
		index: true,
		trim: true,
		unique: true,
		validate: [(username) => {
			return CustomerConstants.patterns.userName.test(username);
		}, 'username must start with a letter or number.'],
	},
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

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;