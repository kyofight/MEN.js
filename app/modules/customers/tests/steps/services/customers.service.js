import{ expect, request } from '../../../../core/tests/util/common';

export const getById = (id) => {
  return request.get(`/customers/${id}`)
    .expect(200)
    .then(function(res) {
      expect(res.body.success).to.be.true;
      return res.body;
    });
}
