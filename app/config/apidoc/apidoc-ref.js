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
