'use strict';

module.exports = function () {
  return function (ctx, next) {
    return next().catch(function (err) {
      switch (err.status) {
        case 401:
          ctx.status = 200;
          ctx.body = {
            status: 401,
            result: {
              err: 'Authentication Error',
              errInfo: 'Protected resource, use Authorization header to get access.'
            }
          };
          break;
        default:
          throw err;
      }
    });
  };
};