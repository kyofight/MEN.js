/**
 * @apiDefine AuthorizationHeader
 *
 * @apiHeader (Header) {String} authorization=Bearer  Jwt Token returned from login Api "api/user/login"
 * @apiHeader (Header) {String} Access-Control-Allow-Origin=* Http request domain list
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "Bearer wqeSsadsaxdgsdnjksandjk"
 *       "Access-Control-Allow-Origin": "*"
 *     }
 */


/**
 * @apiDefine SuccessResponseDetail
 *
 * @apiSuccess (Success Response 2xx) {Boolean} success=true request success
 * @apiSuccess (Success Response 2xx) {Object} data response data
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
 *          "_id": "xxxxx"
 *          ...
 *       }
 *     }
 */

/**
 * @apiDefine SuccessResponseArray
 *
 * @apiSuccess (Success Response 2xx) {Boolean} success=true request success
 * @apiSuccess (Success Response 2xx) {Array} data response data
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": [
 *        {
*            "_id": "xxxxx"
*            ...
 *        },
 *        {
*            "_id": "xxxxx"
*            ...
 *        },
 *        ....
 *       ]
 *     }
 */

/**
 * @apiDefine SuccessResponseList
 *
 * @apiSuccess (Success Response 2xx) {Boolean} success=true request success
 * @apiSuccess (Success Response 2xx) {Object} data response data
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
 *          "pageSize": 3
 *          "page": 1,
 *          "total": 9,
 *          "totalPages": 3
 *          "list": [{ "_id": "xxxxx"}, {"_id": "yyyyy"}, {"_id": "zzzzz"}]
 *       }
 *     }
 */

/**
 * @apiDefine ErrorResponse
 *
 * @apiError (Error Response 4xx/500) {Boolean} success=false request failure
 * @apiError (Error Response 4xx/500) {Object} data request error data
 * @apiError (Error Response 4xx/500) {Number} data.code error reference code
 * @apiError (Error Response 4xx/500) {String} data.message error description message
 * @apiErrorExample Error Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "success": false,
 *       "data": {
 *          "code": "DATABASE_RECORD_NOT_FOUND"
 *          "message": "Record not found for the information provided."
 *       }
 *     }
 */

/**
 * @apiDefine DATABASE_DATA_MODEL_FIELD_VALIDATION_ERROR
 * @apiError (Error Codes) {String} DATABASE_DATA_MODEL_FIELD_VALIDATION_ERROR Make sure data submitted is valid and comply with the constraints. (replaced by message from Mongoose)
**/

/**
 * @apiDefine DATABASE_DATA_MODEL_OBJECT_ID_FORMAT_INVALID
 * @apiError (Error Codes) {String} DATABASE_DATA_MODEL_OBJECT_ID_FORMAT_INVALID The format of the object identity you passed in is invalid.
**/

/**
 * @apiDefine DATABASE_DATA_MODEL_FIELD_UNIQUE_ERROR
 * @apiError (Error Codes) {String} DATABASE_DATA_MODEL_FIELD_UNIQUE_ERROR Value of a field violate unique constraint. (replaced by message from Mongoose)
**/

/**
 * @apiDefine DATABASE_RECORD_NOT_CREATED
 * @apiError (Error Codes) {String} DATABASE_RECORD_NOT_CREATED Record not created for the information provided.
**/

/**
 * @apiDefine DATABASE_RECORD_NOT_UPDATED
 * @apiError (Error Codes) {String} DATABASE_RECORD_NOT_UPDATED Record not updated for the information provided.
**/

/**
 * @apiDefine DATABASE_RECORD_NOT_DELETED
 * @apiError (Error Codes) {String} DATABASE_RECORD_NOT_DELETED Record not deleted for the information provided.
**/

/**
 * @apiDefine DATABASE_RECORD_NOT_FOUND
 * @apiError (Error Codes) {String} DATABASE_RECORD_NOT_FOUND Record not found for the information provided.
**/

/**
 * @apiDefine UNEXPECTED_ERROR
 * @apiError (Error Codes) {String} UNEXPECTED_ERROR Internal Server Error, please try again later.
**/

/**
 * @apiDefine REQUEST_DATA_VALIDATION_REQUIRED_FIELD_MISSING
 * @apiError (Error Codes) {String} REQUEST_DATA_VALIDATION_REQUIRED_FIELD_MISSING Missing required field (field name) in (request type). e.g. Missing required field "description" in "body"
**/
