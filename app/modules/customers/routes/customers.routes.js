import express from 'express';
import CustomerController from '../controllers/customers.controller';


export default function (app) {
  const router = express.Router();


  /**
   * @api {get} /customers Customer List
   * @apiVersion 1.0.0
   * @apiName List Customer
   * @apiDescription List Customer
   * @apiGroup Customer
   *
   *
   * @apiUse SuccessResponseDetail
   * @apiUse ErrorResponse
   */
  router.get('', CustomerController.list());

  /**
   * @api {get} /customers/:id Customer Profile
   * @apiVersion 1.0.0
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
  router.get('/:id', CustomerController.getById());

  /**
   * @api {post} /customers Customer Create
   * @apiVersion 1.0.0
   * @apiName Create Customer Profile
   * @apiDescription Create Customer Profile
   * @apiGroup Customer
   *
   * @apiParam {String} username username of the customer
   * @apiParam {Object} preference preference of the customer ex. { ageFrom: Number, ageTo: Number, species: [...String], breed: [...String] }
   *
   * @apiUse REQUEST_DATA_VALIDATION_REQUIRED_FIELD_MISSING
   * @apiUse DATABASE_DATA_MODEL_FIELD_VALIDATION_ERROR
   * @apiUse DATABASE_RECORD_NOT_CREATED
   *
   * @apiUse SuccessResponseDetail
   * @apiUse ErrorResponse
   */
  router.post('', CustomerController.create());

  /**
   * @api {get} /customers/:id/matches Customer List
   * @apiVersion 1.0.0
   * @apiName View Customer List
   * @apiDescription View Customer List
   * @apiGroup Customer
   *
   * @apiParam {String} id Customer unique ID "_id"
   *
   * @apiUse REQUEST_DATA_VALIDATION_REQUIRED_FIELD_MISSING
   * @apiUse DATABASE_RECORD_NOT_FOUND
   *
   * @apiUse SuccessResponseList
   * @apiUse ErrorResponse
   */
  router.get('/:id/matches', CustomerController.getPetMatchesById());

  app.use('/customers', router);
};
