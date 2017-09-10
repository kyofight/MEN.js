import{ expect, YaddaEnglish } from '../util/common';
import _ from 'lodash';

module.exports =
  YaddaEnglish()
    .then('common - I should get "$type" response', function (type, next) {
      type = type === 'positive';
      expect(this.ctx.lastResponse.success).to.be.eq(type);
      next();
    })
    .then('common - I should get "$type" response and records more than "$num"', function (type, num, next) {
      type = type === 'positive';
      expect(this.ctx.lastResponse.success).to.be.eq(type);
      expect(this.ctx.lastResponse.data.length).to.be.gt(_.parseInt(num));
      next();
    })


