import express from 'express';
import * as PetController from '../controllers/pets.controller';


export default function (app) {
  const router = express.Router();

  /**
   * @api {get} /pets/:id Pet Profile
   * @apiVersion 1.0.0
   * @apiPermission private
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
  router.get('/:id', PetController.getPetById());

  app.use('/pets', router);
};
