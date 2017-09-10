import express from 'express';
import * as CustomerController from '../controllers/customers.controller';


export default function (app) {
  const router = express.Router();

  /**
   * @api {get} /customers/:id Customer Profile
   * @apiVersion 1.0.0
   * @apiPermission private
   * @apiName View Customer Profile
   * @apiDescription View Customer Profile
   * @apiGroup Customer
   *
   * @apiParam {String} id Customer unique ID "_id"
   *
   * @apiUse REQUEST_DATA_VALIDATION_REQUIRED_FIELD_MISSING
   * @apiUse DATABASE_RECORD_NOT_FOUND
   *
   * @apiUse SuccessResponseDetail
   * @apiUse ErrorResponse
   */
  router.get('/:id', CustomerController.getCustomerById());

  app.use('/customers', router);
};
