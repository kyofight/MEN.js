import express from 'express';
import PetController from '../controllers/pets.controller';


export default function (app) {
  const router = express.Router();

  /**
   * @api {get} /pets Pet List
   * @apiVersion 1.0.0
   * @apiName List Pet
   * @apiDescription List Pet
   * @apiGroup Pet
   *
   *
   * @apiUse SuccessResponseDetail
   * @apiUse ErrorResponse
   */
  router.get('', PetController.list());

  /**
   * @api {get} /pets/:id Pet Profile
   * @apiVersion 1.0.0
   * @apiName View Pet Profile
   * @apiDescription View Pet Profile
   * @apiGroup Pet
   *
   * @apiParam {String} id Pet unique ID "_id"
   *
   * @apiUse REQUEST_DATA_VALIDATION_REQUIRED_FIELD_MISSING
   * @apiUse DATABASE_RECORD_NOT_FOUND
   *
   * @apiUse SuccessResponseDetail
   * @apiUse ErrorResponse
   */
  router.get('/:id', PetController.getById());

  /**
   * @api {post} /pets Pet Create
   * @apiVersion 1.0.0
   * @apiName Create Pet Profile
   * @apiDescription Create Pet Profile
   * @apiGroup Pet
   *
   * @apiParam {String} name username of the name
   * @apiParam {Object} attribute of the pet ex. { age: Number, species: String, breed: String }
   *
   * @apiUse REQUEST_DATA_VALIDATION_REQUIRED_FIELD_MISSING
   * @apiUse DATABASE_DATA_MODEL_FIELD_VALIDATION_ERROR
   * @apiUse DATABASE_RECORD_NOT_CREATED
   *
   * @apiUse SuccessResponseDetail
   * @apiUse ErrorResponse
   */
  router.post('', PetController.create());

  /**
   * @api {get} /pets/:id/matches Pet List
   * @apiVersion 1.0.0
   * @apiName View Pet List
   * @apiDescription View Pet List
   * @apiGroup Pet
   *
   * @apiParam {String} id Pet unique ID "_id"
   *
   * @apiUse REQUEST_DATA_VALIDATION_REQUIRED_FIELD_MISSING
   * @apiUse DATABASE_RECORD_NOT_FOUND
   *
   * @apiUse SuccessResponseList
   * @apiUse ErrorResponse
   */
  router.get('/:id/matches', PetController.getCustomerMatchesById());

  app.use('/pets', router);
};
