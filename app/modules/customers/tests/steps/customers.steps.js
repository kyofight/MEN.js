import{ YaddaEnglish } from '../../../core/tests/util/common';
import * as CustomerService from './services/customers.service';

module.exports =
  YaddaEnglish()
    .when('customers - I try to get a customer with id "$id"', function (id, next) {
      const self = this;
      CustomerService.getById(id)
        .then(function (result) {
          self.ctx.lastResponse = result;
          next();
        })
        .catch(next);
    })



